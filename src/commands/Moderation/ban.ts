import { Command, CommandStore, KlasaMessage, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, User, TextChannel } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<user:user> [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [User, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const member = (msg.guild as Guild).members.get(user.id);
        if (member && member.permissions.has('MANAGE_GUILD')) return msg.sendMessage('Cannot ban this user');

        await user.send(`You were banned from ${(msg.guild as Guild).name} for reason:\n${reason}`).catch(console.log);
        await (msg.guild as Guild).members.ban(user.id, { reason: reason }).catch((e) => { throw e; });

        const data = {
            id: (msg.guild as KlasaGuild).settings.get('modlogs.total'),
            moderator: (msg.author as User).id,
            user: user.id,
            reason: reason,
            time: Date.now(),
            type: 'Ban'
        };

        (msg.guild as Guild).settings.update('modlogs.cases', data, { action: 'add' });
        (msg.guild as Guild).settings.update('modlogs.total', (msg.guild as KlasaGuild).settings.get('modlogs.total') + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${user.toString()} was banned for reason **${reason}**`);
    }
}
