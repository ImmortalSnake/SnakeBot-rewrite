import { CommandStore, KlasaMessage } from 'klasa';
import { User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:user> [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5,
            description: lang => lang.get('COMMAND_BAN_DESCRIPTION')
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [User, string]): Promise<KlasaMessage | KlasaMessage[]> {
        if (user.id === msg.author.id) throw ':x: You cannot ban yourself!';
        if (user.id === this.client.id) throw ':x: I cannot ban myself';

        const member = msg.guild!.members.get(user.id);
        if (member) {
            if (member.roles.highest.position >= msg.member!.roles.highest.position) throw ':x: You cannot ban this user!';
            if (!member.bannable) throw ':x: Cannot ban this user!';
        }

        await user.send(`You were banned from **${msg.guild!.name}** for reason:\n**${reason}**`).catch(() => null);
        await msg.guild!.members.ban(user.id, { reason });

        const data = {
            id: msg.guildSettings.get('modlogs.total') as number,
            moderator: msg.author!.id,
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
