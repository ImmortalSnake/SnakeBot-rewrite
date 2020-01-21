import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import AudioTrack from '../../lib/structures/audio/AudioTrack';
import { MessageEmbed } from 'discord.js';
import Util from '../../lib/utils/Util';
// import AudioEmbed from '../../lib/structures/audio/embed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<track:song>'
        });
    }

    public async run(msg: KlasaMessage, [tracks]: [AudioTrack[]]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (!msg.member?.voice.channel) return msg.send('You need to be in a voice channel!');
        tracks.forEach(track => this.client.audio.handleTrack(msg.guild!, track));

        const { url, title, length } = tracks[0].info;

        const embed = new MessageEmbed()
            .setURL(url)
            .setTitle(title)
            .addField('Length', Util.msToDuration(length))
            .setFooter('Requested By', msg.author.tag);

        return msg.send(tracks.length > 1 ? 'Playlist Loaded!' : 'Track Loaded', embed);
    }

}
