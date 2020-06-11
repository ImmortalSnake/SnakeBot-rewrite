import { Util } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export type Tag = [string, string];

export default class TagCommand extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            subcommands: true,
            usage: '<add|remove|source|list|show:default> (tag:tagname) [content:...string]',
            examples: [
                'add pins Please check the pins for this channel',
                'remove pins',
                'source pins',
                'list',
                'show pins'
            ]
        });

        this.createCustomResolver('tagname', (arg, possible, message, [action]) => {
            if (action === 'list') return arg;
            if (!arg) throw message.language.get('RESOLVER_INVALID_STRING', possible.name);
            if (arg.length > 50) throw 'Tag name is over 50 characters!';

            return arg.toLowerCase();
        });
    }

    public async add(msg: KlasaMessage, [tagName, content]: [string, string]) {
        if (!await msg.hasAtLeastPermissionLevel(4)) throw msg.language.get('COMMAND_TAG_ADD_NO_PERMS');
        if (!content) throw 'No content was provided';

        const tags = msg.guild!.settings.get('tags') as Tag[];
        if (tags.some(([name]) => name === tagName.toLowerCase())) throw `Tag **${tagName}** already exists, please remove it and add it again if you wish to update it`;

        await msg.guild!.settings.update('tags', [...tags, [tagName.toLowerCase(), content]], { action: 'overwrite' });
        return msg.send(`Added the tag \`${tagName}\` with content: \`\`\`${Util.escapeMarkdown(content)}\`\`\``);
    }

    public async remove(message: KlasaMessage, [tagName]: [string]) {
        if (!await message.hasAtLeastPermissionLevel(4)) throw 'Sorry, you dont have the permission to remove tags';
        const tags = message.guild!.settings.get('tags') as Tag[];

        const tag = tags.find(([name]) => name === tagName.toLowerCase());
        if (!tag) throw `${tagName} does not exist`;

        await message.guild!.settings.update('tags', [tag], { action: 'remove' });
        return message.send(`Removed the tag \`${tagName}\``);
    }

    public list(message: KlasaMessage) {
        return message.send(`Tags for this guild are: ${(message.guild!.settings.get('tags') as Tag[]).map(([name]) => name).join(', ')}`);
    }

    public show(message: KlasaMessage, [tag]: [string]) {
        const emote = (message.guild!.settings.get('tags') as Tag[]).find(([name]) => name === tag.toLowerCase());
        if (!emote) return null;
        return message.send(emote[1]);
    }

    public source(message: KlasaMessage, [tag]: [string]) {
        const emote = (message.guild!.settings.get('tags') as Tag[]).find(([name]) => name === tag.toLowerCase());
        if (!emote) return null;
        return message.send(`\`\`\`${Util.escapeMarkdown(emote[1])}\`\`\``);
    }

}
