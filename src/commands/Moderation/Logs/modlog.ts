import { CommandStore, KlasaMessage, KlasaUser, RichDisplay, util } from 'klasa';
import { MessageEmbed } from 'discord.js';
import SnakeCommand from '../../../lib/structures/base/SnakeCommand';
import { ModLogData } from '../../../lib/structures/ModLog';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['modlogs'],
            usage: '[user:user]',
            requiredPermissions: ['EMBED_LINKS', 'ADD_REACTIONS'],
            permissionLevel: 5,
            examples: ['', '@Jeff']
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[] | null> {
        let cases = msg.guildSettings.get('modlogs') as ModLogData[];
        if (user) cases = cases.filter(c => c.user === user.id);

        if (cases.length === 0) throw `No cases were found for ${user?.tag || msg.guild!.name}`;

        const display = new RichDisplay(new MessageEmbed()
            .setTitle(`Modlogs for ${user ? user.tag : msg.guild!.name}`)
            .setColor('#2f62b5')
            .setAuthor(this.client.user!.tag, this.client.user!.displayAvatarURL()));

        for (const lst of util.chunk(cases, 10)) {
            const description = lst.map(c => {
                if (c.user) {
                    const user = msg.client.users.cache.get(c.user);
                    return `**Case ${c.id}: ${c.action}** \`${user?.tag || ''} (${c.user})\` *${c.reason || 'N/A'}*`;
                }

                return `**Case ${c.id}: ${c.action}** *${c.reason || 'N/A'}*`;
            });
            display.addPage((template: MessageEmbed) => template.setDescription(description));
        }

        await display.run(await msg.send('Loading modlogs...') as KlasaMessage);
        return null;
    }

}
