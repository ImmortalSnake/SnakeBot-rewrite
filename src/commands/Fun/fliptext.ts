import { CommandStore, KlasaMessage } from 'klasa';
import flip from '../../lib/Data/json/flip.json';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<text:...str{1,500}>',
            examples: ['See this text get flipped!']
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        let flipped = '';
        for (let i = text.length - 1; i >= 0; i--) {
            flipped += (flip as any)[text[i]] || text[i];
        }
        return msg.send(flipped);
    }

}
