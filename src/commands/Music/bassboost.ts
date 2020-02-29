import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['bass', 'earrape'],
            music: ['SAME_VC', 'VOICE_PLAYING']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        const res = await msg.guild!.audio!.bassboost();
        return msg.sendLocale('COMMAND_BASSBOOST_SUCCESS', [res]);
    }

}
