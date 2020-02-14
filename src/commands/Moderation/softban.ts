import { CommandStore, KlasaMessage } from 'klasa';
import { User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:user> [days:int{1,7}] [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user, days = 7, reason = 'N/A']: [User, number, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const member = msg.guild!.members.get(user.id);
        if (member) {
            if (member.permissions.has('MANAGE_GUILD')) throw 'You cannot ban this user';
            else if (!member.bannable) throw 'Could not ban this user';
        }

        await user.send(`You were banned from ${msg.guild!.name} for reason:\n${reason}`).catch(() => null);
        await msg.guild!.members.ban(user.id, { reason, days });
        await msg.guild!.members.unban(user.id, `Softban Released`);

        const data = {
            id: msg.guildSettings.get('modlogs.total') as number,
            moderator: msg.author.id,
            user: user.id,
            reason,
            time: Date.now(),
            type: 'Softban',
            duration: days * 86400000
        };

        await msg.guildSettings.update('modlogs.cases', data, { arrayAction: 'add' });
        await msg.guildSettings.update('modlogs.total', (msg.guildSettings.get('modlogs.total') as number) + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${user.toString()} was softbanned for reason **${reason}**`);
    }

}
