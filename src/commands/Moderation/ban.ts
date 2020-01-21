import { CommandStore, KlasaMessage } from 'klasa';
import { Guild, User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:user> [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [User, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const member = (msg.guild as Guild).members.get(user.id);
        if (member && member.permissions.has('MANAGE_GUILD')) return msg.sendMessage('Cannot ban this user');

        await user.send(`You were banned from ${(msg.guild as Guild).name} for reason:\n${reason}`).catch(() => null);
        await (msg.guild as Guild).members.ban(user.id, { reason });

        const data = {
            id: msg.guildSettings.get('modlogs.total') as number,
            moderator: (msg.author as User).id,
            user: user.id,
            reason,
            time: Date.now(),
            type: 'Ban'
        };

        await msg.guildSettings.update('modlogs.cases', data, { arrayAction: 'add' });
        await msg.guildSettings.update('modlogs.total', (msg.guildSettings.get('modlogs.total') as number) + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${user.toString()} was banned for reason **${reason}**`);
    }

}
