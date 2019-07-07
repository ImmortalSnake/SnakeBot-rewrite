import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import AudioTrack from '../../lib/structures/audio/track';
import { Guild, GuildMember, VoiceChannel, ClientUser, VoiceState } from 'discord.js';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        let audio = (this.client as SnakeBot).audio;

        if (!(msg.member as GuildMember).voice.channel) return msg.send('not in vc');
        return audio.join((msg.member as GuildMember).voice.channel as VoiceChannel)
            .then(() => {
                return msg.sendMessage('Successfully joined your Voice Channel!');
            });
    }
}
