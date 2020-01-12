import { Command, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        await (this.client as SnakeBot).meme.cat(msg.channel.id);
        return null;
    }

}
