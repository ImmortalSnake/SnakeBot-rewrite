import { Command, CommandStore, KlasaMessage, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, GuildMember, User, TextChannel, MessageEmbed } from 'discord.js';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_GUILD']
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const reportschan = (msg.guild as Guild).channels.get((msg.guild as KlasaGuild).settings.get('channels.reports')) || (msg.guild as Guild).channels.find(c => c.name.toLowerCase() === 'reports');
        if (!reportschan) throw `Could not find a reports channel for this server`;

        msg.channel.send((this.client as SnakeBot).embed(msg, { description: reason, title: 'Reports' })
            .addField('Reporter', (msg.author as User).toString())
            .addField('Channel', msg.channel.toString())
            .addField('Reported User', user.toString()));

        await msg.delete();
        return null;
    }
}
