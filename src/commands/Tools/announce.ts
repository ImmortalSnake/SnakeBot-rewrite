import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import { Role, TextChannel } from 'discord.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<text:...string{1,2000}>',
            permissionLevel: 6,
            requiredPermissions: ['MANAGE_ROLES', 'EMBED_LINKS', 'ADD_REACTIONS'],
            requiredSettings: ['roles.announce', 'channels.announce']
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const [role] = await msg.guildSettings.resolve('roles.announce') as [Role];
        const [chan] = await msg.guildSettings.resolve('channels.announce') as [TextChannel];

        if (!chan || !chan.postable) throw `I cant send any messages to the announcement channel ${chan.toString()}`;
        if (!role || (!role.mentionable && !role.editable)) throw `I cant mention the announcement role ${role.name}`;

        const content = `**New Announcement** ${role.toString()}\n${text}`;
        const confirm = await msg.ask(`This message will be sent to ${chan.toString()}. Please confirm`, {
            embed: new SnakeEmbed(msg)
                .setDescription(content)
                .init()
        });

        if (!confirm) return msg.send('Cancelled announcement');
        const mention = role.mentionable;
        if (!mention) await role.setMentionable(true, 'Announcement');
        await chan.send(content);
        if (!mention) await role.setMentionable(false, 'Announcement');

        return msg.sendLocale('COMMAND_ANNOUNCE_SUCCESS');
    }

}
