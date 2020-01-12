import { KlasaMessage } from 'klasa';
import { GuildMember } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {

        if (!(msg.member as GuildMember).voice.channel) return msg.send('You need to be in a voice channel');
        return null;/* audio.join((msg.member as GuildMember).voice.channel as VoiceChannel)
            .then(() => {
                return msg.sendMessage('Successfully joined your Voice Channel!');
            });*/
    }

}
