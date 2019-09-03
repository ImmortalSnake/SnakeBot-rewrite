import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        await (this.client as SnakeBot).meme.dog(msg.channel.id);
        return null;
    }
}
