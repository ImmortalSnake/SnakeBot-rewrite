import { CommandStore, KlasaMessage, Command } from 'klasa';
import AudioTrack from '../../lib/structures/audio/AudioTrack';
import { MessageEmbed } from 'discord.js';
import Util from '../../lib/utils/Util';
import MusicCommand from '../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<track:song>',
            music: ['USER_VC'],
            examples: ['see you again']
        });
    }

    public async run(msg: KlasaMessage, [tracks]: [AudioTrack[]]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (!msg.guild!.audio || !msg.guild!.me!.voice.channelID) await (this.store.get('join') as Command)!.run(msg, []);

        tracks.forEach(track => msg.guild!.audio!.handleTrack(msg, track));
        const { uri, title, length } = tracks[0].info;

        const embed = new MessageEmbed()
            .setURL(uri)
            .setTitle(title)
            .setDescription(Util.msToDuration(length))
            .setFooter(`Requested By ${msg.author.tag}`, msg.author.displayAvatarURL());

        return msg.send(tracks.length > 1 ? '✅ **Playlist Loaded!**' : '✅ **Track Loaded!**', embed);
    }

}
