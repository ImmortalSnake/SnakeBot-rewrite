import { CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<title:...str>'
        });
    }

    public async run(msg: KlasaMessage, [title]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const embed = (this.client as SnakeBot).embed(msg, {
            title,
            description: 'React Below!'
        });
        const m = await msg.sendEmbed(embed) as KlasaMessage;
        await m.react('👍');
        await m.react('👎');

        return m;
    }

}
