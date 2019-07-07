import { Command, CommandStore, KlasaMessage, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<user:user> [days:int{1,7}] [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user, days = 7, reason = 'N/A']: [User, number, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const member = (msg.guild as Guild).members.get(user.id);
        if (member) {
            if (member.permissions.has('MANAGE_GUILD')) throw 'You cannot ban this user';
            else if (!member.bannable) throw 'Could not ban this user';
        }

        await user.send(`You were banned from ${(msg.guild as Guild).name} for reason:\n${reason}`).catch(console.log);
        await (msg.guild as Guild).members.ban(user.id, { reason: reason, days }).catch((e) => { throw e; });
        await (msg.guild as Guild).members.unban(user.id, `Softban Released`);

        const data = {
            id: (msg.guild as KlasaGuild).settings.get('modlogs.total'),
            moderator: (msg.author as User).id,
            user: user.id,
            reason: reason,
            time: Date.now(),
            type: 'Softban',
            duration: days * 86400000
        };

        (msg.guild as Guild).settings.update('modlogs.cases', data, { action: 'add' });
        (msg.guild as Guild).settings.update('modlogs.total', (msg.guild as KlasaGuild).settings.get('modlogs.total') + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${user.toString()} was softbanned for reason **${reason}**`);
    }
}
