import { CommandStore, KlasaMessage } from 'klasa';
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
        return msg.guildSettings.update('afkusers', {
            id: msg.author!.id,
            reason
        })
            .then(() => msg.sendLocale('COMMAND_AFK_CREATE', [msg.author.toString(), reason]));
    }

}
