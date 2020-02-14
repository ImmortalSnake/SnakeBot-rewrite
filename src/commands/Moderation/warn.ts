import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[]> {
        if (user.roles.highest.position >= msg.member!.roles.highest.position) throw ':x: You cannot warn this user!';
        await user.send(`You were warned in ${msg.guild!.name} for: ${reason}`).catch(() => null);

        const data = {
            id: msg.guildSettings.get('modlogs.total') as number,
            moderator: (msg.author as User).id,
            user: user.id,
            reason,
            time: Date.now(),
            type: 'Warn'
        };

        await msg.guildSettings.update('modlogs.cases', data, { arrayAction: 'add' });
        await msg.guildSettings.update('modlogs.total', (msg.guildSettings.get('modlogs.total') as number) + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${user.toString()} was warned!`);
    }

}
