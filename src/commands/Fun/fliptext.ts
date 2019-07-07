import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import flip from '../../lib/Data/json/flip.json';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<text:...str{1,500}>',
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        let flipped = '';
        for (let i = text.length - 1; i >= 0; i--) {
            flipped += (flip as any)[text[i]] || text[i];
        }
        return msg.sendMessage(flipped);
    }
}
