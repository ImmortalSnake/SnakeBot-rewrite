import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[reason:...str]',
            requiredPermissions: ['MANAGE_MESSAGES'],
            cooldown: 10,
            examples: ['having dinner']
        });
    }

    public async run(msg: KlasaMessage, [reason = 'No reason']: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.author.settings.update([['afk.time', Date.now()], ['afk.reason', reason]])
            .then(() => msg.sendLocale('COMMAND_AFK_CREATE', [msg.author.toString(), reason]));
    }

}
