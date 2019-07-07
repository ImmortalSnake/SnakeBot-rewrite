import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<item:...str>',
        });
    }

    public async run(msg: KlasaMessage, [item]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendMessage(`I would give ${item} a ${Math.floor(Math.random() * 10)}`);
    }
}
