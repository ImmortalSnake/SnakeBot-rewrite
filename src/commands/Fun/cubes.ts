import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import Discord from 'discord.js';

export default class extends Command {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[text:...str{1,21}]'
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const cube = [];
        const mid = 2 * (Math.floor((text.length + 2) / 4));


        return msg;
    }

}
