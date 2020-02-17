import { CommandStore, KlasaMessage } from 'klasa';
import { User } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import ModLog from '../../lib/structures/ModLog';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            usage: '<user:user> [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user, reason]: [User, string?]): Promise<KlasaMessage | KlasaMessage[]> {
        await msg.guild!.members.unban(user.id);

        return new ModLog(msg, 'Unban')
            .setUser(user)
            .setReason(reason)
            .save()
            .then(() => msg.sendMessage(`${user.toString()} was unbanned${reason ? ` for reason **${reason}**` : ''}`));
    }

}
