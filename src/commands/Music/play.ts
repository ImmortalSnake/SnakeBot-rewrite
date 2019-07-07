import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, GuildMember, VoiceChannel, ClientUser, VoiceState } from 'discord.js';
import AudioEmbed from '../../lib/structures/audio/embed';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<query:...str{0,250}>'
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        let audio = (this.client as SnakeBot).audio;
        if (!(msg.member as GuildMember).voice.channel || !((msg.member as GuildMember).voice.channel as VoiceChannel).members.has((this.client.user as ClientUser).id)) return msg.send('join my vc');

        let video = await audio.load(msg, query);
        if (!video) throw 'Could not load track';

        await audio.loadTrack(msg, video[0]).catch(console.log);
        return null; // msg.sendMessage(new AudioEmbed(this.client, video[0]));
    }
}
