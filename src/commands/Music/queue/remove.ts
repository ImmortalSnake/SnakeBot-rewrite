import MusicCommand from '../../../lib/structures/base/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<number:int>',
            music: ['SAME_VC', 'QUEUE_NOT_EMPTY']
        });
    }

    public async run(msg: KlasaMessage, [index]: [number]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (index > msg.guild!.audio!.tracks.length || index < 0) throw 'Invalid number';

        msg.guild!.audio!.tracks.splice(index, 1);
        return msg.send(`Resumed current playing music`);
    }

}
