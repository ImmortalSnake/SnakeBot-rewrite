import MusicCommand from '../../lib/structures/base/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            music: ['SAME_VC']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        await msg.guild!.audio.player!.resume();
        return msg.sendLocale('COMMAND_RESUME_SUCCESS');
    }

}
