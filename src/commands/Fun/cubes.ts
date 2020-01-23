import { CommandStore, KlasaMessage, util } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[text:...str{1,21}]',
            aliases: ['cubes'],
            examples: ['superslitherysnakes']
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        text = text.toUpperCase().split('').join(' ');
        const space1 = 2 * Math.floor((text.length + 2) / 4);
        const s = ' ';

        const res = [`${s.repeat(space1)}${text}`];

        for (let sp = space1 - 2; sp > 0; sp -= 2) {
            const diff = space1 - sp;
            res.push(`${s.repeat(sp)}/${s.repeat(diff - 1)}${text[diff]}${s.repeat(text.length - diff - 2)}/${s.repeat(diff - 1)}${text[diff]}`);
        }

        res.push(`${text}${s.repeat(space1 - 1)}${text[space1]}`);

        for (let ln = 2; ln < text.length - 2; ln += 2) {
            let string = text[ln];

            if (ln < Math.floor((text.length - 2) / 2)) {
                string += `${s.repeat(space1 - 1)}${text[space1 - ln]}${s.repeat(text.length - space1 - 2)}${text[ln]}${s.repeat(space1 - 1)}${text[space1 + ln]}`;
            } else if (ln > Math.floor(text.length / 2)) {
                string += `${s.repeat(text.length - ln - 2)}/${s.repeat(ln - 1)}${text[ln]}${s.repeat(text.length - ln - 2)}/`;
            } else {
                string += `${s.repeat(space1 - 1)}${text}`;
            }

            res.push(string);
        }

        res.push(text);

        return msg.send(util.codeBlock('', res.join('\n')));
    }

}
