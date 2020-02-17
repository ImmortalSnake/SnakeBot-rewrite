import { CommandStore, KlasaMessage } from 'klasa';
import { User } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import ModLog from '../../lib/structures/ModLog';
import { Hour } from '../../lib/utils/constants';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:user> [days:int{1,7}] [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5,
            enabled: false
        });
    }

    public async run(msg: KlasaMessage, [user, days = 0, reason]: [User, number, string?]): Promise<KlasaMessage | KlasaMessage[]> {
        const member = msg.guild!.members.get(user.id);
        if (member) {
            if (member.permissions.has('MANAGE_GUILD')) throw 'You cannot ban this user';
            else if (!member.bannable) throw 'Could not ban this user';
        }

        await user.send(`You were banned from ${msg.guild!.name} for reason:\n${reason}`).catch(() => null);
        await msg.guild!.members.ban(user.id, { reason, days });
        await msg.guild!.members.unban(user.id, `Softban Released`);

        return new ModLog(msg, 'Ban')
            .setUser(user)
            .setReason(reason)
            .setDuration(days * 24 * Hour)
            .save()
            .then(() => msg.sendMessage(`${user.toString()} was softbanned for reason **${reason}**`));
    }

}
