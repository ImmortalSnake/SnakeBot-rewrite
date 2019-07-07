import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import puns from '../../lib/Data/json/puns.json';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<question:...str>',
            aliases: ['puns']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendMessage(`${puns[Math.floor(Math.random() * puns.length)]}`);
    }
}
