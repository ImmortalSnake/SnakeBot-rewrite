import { Command, CommandStore, KlasaMessage, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, GuildMember, User, TextChannel } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[]> {
        await user.send(`You were warned in ${(msg.guild as Guild).name} for: ${reason}`).catch(console.log);

        const data = {
            id: (msg.guild as KlasaGuild).settings.get('modlogs.total'),
            moderator: (msg.author as User).id,
            user: user.id,
            reason: reason,
            time: Date.now(),
            type: 'Warn'
        };

        (msg.guild as Guild).settings.update('modlogs.cases', data, { action: 'add' });
        (msg.guild as Guild).settings.update('modlogs.total', (msg.guild as KlasaGuild).settings.get('modlogs.total') + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${user.toString()} was warned!`);
    }
}
