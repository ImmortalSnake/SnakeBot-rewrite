import { KlasaMessage } from 'klasa';
// import AudioTrack from '../../lib/structures/audio/track';
import { GuildMember } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {

        if (!(msg.member as GuildMember).voice.channel) return msg.send('no vc');
        // audio.join((msg.member as GuildMember).voice.channel as VoiceChannel);
        return null;
    }

}
