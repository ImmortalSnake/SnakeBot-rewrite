import { CommandStore, KlasaMessage } from 'klasa';
import AudioTrack from '../../lib/structures/audio/AudioTrack';
import { MessageEmbed } from 'discord.js';
import Util from '../../lib/utils/Util';
import MusicCommand from '../../lib/structures/base/MusicCommand';
// import AudioEmbed from '../../lib/structures/audio/embed';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<track:song>',
            music: ['SAME_VC']
        });
    }

    public async run(msg: KlasaMessage, [tracks]: [AudioTrack[]]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (!msg.member?.voice.channel) return msg.send('You need to be in a voice channel!');
        tracks.forEach(track => msg.guild!.audio!.handleTrack(msg, track));

        const { uri, title, length } = tracks[0].info;

        const embed = new MessageEmbed()
            .setURL(uri)
            .setTitle(title)
            .addField('Length', Util.msToDuration(length))
            .setFooter(`Requested By ${msg.author.tag}`);

        return msg.send(tracks.length > 1 ? 'Playlist Loaded!' : 'Track Loaded', embed);
    }

}
