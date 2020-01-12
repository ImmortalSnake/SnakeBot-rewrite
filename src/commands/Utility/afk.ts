import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<reason:...str>',
            requiredPermissions: ['MANAGE_NICKNAMES', 'MANAGE_MESSAGES'],
            cooldown: 10
        });
    }

    public async run(msg: KlasaMessage, [reason]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        await msg.guildSettings.update('afkusers', {
            id: msg.author!.id,
            reason
        });

        return msg.sendMessage(`${(msg.author as KlasaUser).toString()} has  been set to AFK for reason: **${reason}**`);
    }

}
