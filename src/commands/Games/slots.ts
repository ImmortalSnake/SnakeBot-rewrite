import { CommandStore, KlasaMessage } from 'klasa';
import Slots from '../../lib/Games/slots';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 20,
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendEmbed(new Slots(msg).play());
    }

}
