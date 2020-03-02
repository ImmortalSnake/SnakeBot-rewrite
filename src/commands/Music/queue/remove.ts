import MusicCommand from '../../../lib/structures/base/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<number:int>',
            music: ['SAME_VC', 'QUEUE_NOT_EMPTY'],
            examples: ['5']
        });
    }

    public async run(msg: KlasaMessage, [index]: [number]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (index > msg.guild!.audio!.tracks.length || index < 1) throw 'Invalid number';

        const [track] = msg.guild!.audio!.tracks.splice(index + 1, 1);
        return msg.sendLocale('COMMAND_REMOVE_SUCCESS', [track.info.title]);
    }

}
