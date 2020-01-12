import { CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, GuildMember, User } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_GUILD']
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const reportschan = (msg.guild as Guild).channels.get(msg.guildSettings.get('channels.reports') as string) || (msg.guild as Guild).channels.find(c => c.name.toLowerCase() === 'reports');
        if (!reportschan) throw `Could not find a reports channel for this server`;

        await msg.channel.send((this.client as SnakeBot).embed(msg, { description: reason, title: 'Reports' })
            .addField('Reporter', (msg.author as User).toString())
            .addField('Channel', msg.channel.toString())
            .addField('Reported User', user.toString()));

        await msg.delete();
        return null;
    }

}
