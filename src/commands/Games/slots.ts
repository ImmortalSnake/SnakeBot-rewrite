import { CommandStore, KlasaMessage } from 'klasa';
import Slots from '../../lib/Games/slots';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 5
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendEmbed(await new Slots(this.client, msg).play());
    }

}
