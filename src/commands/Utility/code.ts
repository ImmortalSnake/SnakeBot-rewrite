import { CommandStore, KlasaMessage, util } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import Util from '../../lib/utils/Util';
import fetch from 'node-fetch';
import languages from '../../lib/Data/json/code.json';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<code:...str>',
            examples: ['``py\nprint(2+2)\n``']
        });
    }

    public async run(msg: KlasaMessage, [code]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const resolved = Util.removeCodeBlock(code);
        if (!resolved) throw 'Please enter the code using codeblocks';
        const [lang, input] = resolved;
        const language = languages.find(l => l.name.includes(lang));
        if (!language) throw `Sorry! this language (${lang}) is not supported!`;

        const result = await fetch(`https://pastebin.run/api/v0/run/${language.identifier}`, {
            body: new URLSearchParams({ code: input, compilerOptions: '', stdin: '' }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!result.ok) return msg.send(await result.text());

        const { stdout, stderr } = await result.json();
        return msg.send(util.codeBlock(language.identifier, stdout || stderr));
    }

}
