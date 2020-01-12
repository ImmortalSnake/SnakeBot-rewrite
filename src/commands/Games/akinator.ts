import { CommandStore, KlasaMessage } from 'klasa';
import akinator from '../../lib/Games/akinator';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['aki'],
            cooldown: 5
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        await new akinator().play(msg);
        return null;
    }

}
