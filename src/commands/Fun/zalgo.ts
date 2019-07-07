import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import zalgo from '../../lib/Data/json/zalgo.json';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<text:...str{1,500}>',
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += text[i];
            for (const chars of Object.values(zalgo)) {
                let count = Math.floor(Math.random() * 5);
                while (count--) result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        return msg.sendMessage(result);
    }
}
