import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<text:...str>',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 4
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.delete().then(() => msg.send(text));
    }
}
