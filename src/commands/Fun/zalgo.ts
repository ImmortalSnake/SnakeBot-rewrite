import { CommandStore, KlasaMessage } from 'klasa';
import zalgo from '../../lib/Data/ts/zalgo';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<text:...str{1,500}>'
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        let result = '';
        for (const i of text) {
            result += i;
            for (const chars of Object.values(zalgo)) {
                let count = Math.floor(Math.random() * 5);
                while (count--) result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        return msg.sendMessage(result);
    }

}
