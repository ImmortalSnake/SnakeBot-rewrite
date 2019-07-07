import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import quotes from '../../lib/Data/json/quotes.json';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<question:...str>',
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        return msg.sendMessage(`${quote.quote} - _${quote.author}_`);
    }
}
