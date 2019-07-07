import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import Slots from '../../lib/Games/slots';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            cooldown: 5
        });
    }

    public async run(msg: KlasaMessage, [title]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendEmbed(await new Slots(this.client, msg).play());
    }
}
