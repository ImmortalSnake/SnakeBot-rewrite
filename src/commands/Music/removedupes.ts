import MusicCommand from '../../lib/structures/base/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            music: ['SAME_VC', 'QUEUE_NOT_EMPTY', 'DJ_REQUIRED']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        const diff = msg.guild!.audio!.tracks.length - msg.guild!.audio!.removeDupes().length;
        return msg.send(`✅ Removed **${diff}** duplicate tracks from the queue`);
    }

}
