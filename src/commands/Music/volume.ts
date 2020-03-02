import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[volume:int{0,200}]',
            music: ['DJ_REQUIRED', 'SAME_VC'],
            examples: ['', '50']
        });
    }

    public async run(msg: KlasaMessage, [volume]: [number?]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (!volume && volume !== 0) return msg.sendLocale('COMMAND_VOLUME_VIEW', [msg.guild!.audio!.state.volume]);

        await msg.guild!.audio!.volume(volume);
        return msg.sendLocale('COMMAND_VOLUME_SET', [volume]);
    }

}
