import { KlasaMessage } from 'klasa';
import quotes from '../../lib/Data/json/quotes.json';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        return msg.send(`${quote.quote} - _${quote.author}_`);
    }

}
