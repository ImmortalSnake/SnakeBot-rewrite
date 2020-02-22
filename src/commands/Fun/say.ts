import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<text:...str>',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 4,
            examples: ['hello, i am alive']
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.delete().then(() => msg.send(text));
    }

}
