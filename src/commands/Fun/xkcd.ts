import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            requiredPermissions: ['EMBED_LINKS'],
            usage: '[query:string]',
            enabled: false,
            cooldown: 10,
            enabled: false
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.send('no');
    }

}
