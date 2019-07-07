import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import replies from '../../lib/Data/ts/8ball';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<question:...str>',
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendMessage(`🎱${replies[Math.floor(Math.random() * replies.length)]}🎱`);
    }
}
