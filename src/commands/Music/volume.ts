import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[volume:int{0,1000}]',
            music: ['DJ_REQUIRED', 'SAME_VC']
        });
    }

    public async run(msg: KlasaMessage, [volume]: [number?]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (!volume) return msg.send(`🔊 The volume for this guild is **${msg.guild!.audio!.state.volume}**`);

        msg.guild!.audio!.volume(volume);
        return msg.send(`🔊 Set the volume to **${volume}**`);
    }

}
