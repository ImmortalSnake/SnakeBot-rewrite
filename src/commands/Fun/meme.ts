import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        await (this.client as SnakeBot).meme.meme(msg.channel.id);
        return null;
    }
}
