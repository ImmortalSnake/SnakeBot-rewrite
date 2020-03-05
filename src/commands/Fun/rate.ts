import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<item:...str>',
            examples: ['discord']
        });
    }

    public async run(msg: KlasaMessage, [item]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendLocale('COMMAND_RATE_REPLY', [item, Math.round(Math.random() * 10)]);
    }

}
