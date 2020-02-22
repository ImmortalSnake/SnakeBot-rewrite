import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<position:timespan>',
            music: ['VOICE_PLAYING', 'SAME_VC'],
            examples: ['1m 20s']
        });
    }

    public async run(msg: KlasaMessage, [position]: [number]): Promise<KlasaMessage | KlasaMessage[] | null> {
        await msg.guild!.audio!.seek(position);
        return msg.send(`Successfully changed the time!`);
    }

}
