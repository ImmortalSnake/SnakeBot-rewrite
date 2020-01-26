import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['repeat'],
            music: ['SAME_VC', 'VOICE_PLAYING']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        msg.guild!.audio!.setRepeat();
        return msg.send(`Queue loop has been turned **${msg.guild!.audio!.repeat ? 'on' : 'off'}**`);
    }

}
