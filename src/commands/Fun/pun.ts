import { CommandStore, KlasaMessage } from 'klasa';
import puns from '../../lib/Data/json/puns.json';
import SnakeCommand from '../../lib/structures/base/SnakeCommand.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['puns']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.send(`${puns[Math.floor(Math.random() * puns.length)]}`);
    }

}
