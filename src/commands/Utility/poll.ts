import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<title:...str>',
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
