import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            music: ['SAME_VC', 'QUEUE_NOT_EMPTY', 'DJ_REQUIRED']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        msg.guild!.audio!.shuffle();
        return msg.send(`🔀 Shuffled the queue!`);
    }

}
