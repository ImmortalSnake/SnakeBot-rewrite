import { KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {

        if (!msg.member!.voice.channel) return msg.send('You need to be in a voice channel');
        // audio.join((msg.member as GuildMember).voice.channel as VoiceChannel);
        return null;
    }

}
