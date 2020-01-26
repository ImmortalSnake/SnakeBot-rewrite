import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<text:...str>'
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.send(text.split('').map(char => this.vaporwave(char)).join(''));
    }

    private vaporwave(char: string) {
        const code = char.charCodeAt(0);
        return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char;
    }

}
