import MusicCommand from '../../../lib/structures/base/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<from:int{1,}> <to:int{1,}>',
            music: ['SAME_VC', 'QUEUE_NOT_EMPTY'],
            examples: ['4 2']
        });
    }

    public async run(msg: KlasaMessage, [from, to]: [number, number]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (from === to) throw `❌ Cannot move the track to the same position`;
        const { tracks } = msg.guild!.audio!;
        if (from > tracks.length || to > tracks.length) throw '❌ Invalid position';

        msg.guild!.audio!.tracks = tracks.splice(to, 0, tracks.splice(from, 1)[0]);
        return msg.sendLocale('COMMAND_MOVE_SUCCESS', [from, to]);
    }

}
