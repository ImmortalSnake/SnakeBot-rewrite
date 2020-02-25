import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import fetch from 'node-fetch';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<text:...str>',
            examples: ['cows are cool']
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return fetch(`http://cowsay.morecode.org/say?message=${text}&format=json`)
            .then(res => res.json())
            .then((data: CowSayResponse) => msg.sendCode('', data.cow));
    }

}

interface CowSayResponse {
    text: string;
    message: string;
    cow: string;
}
