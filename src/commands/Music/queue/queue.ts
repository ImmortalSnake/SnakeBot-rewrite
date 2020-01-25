import { KlasaMessage, RichDisplay, util, CommandStore } from 'klasa';
import { MessageEmbed } from 'discord.js';
import AudioTrack from '../../../lib/structures/audio/AudioTrack';
import MusicCommand from '../../../lib/structures/base/MusicCommand';
import { ZWS } from '../../../lib/utils/constants';
import Util from '../../../lib/utils/Util';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['connect'],
            music: ['QUEUE_NOT_EMPTY']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {

        const player = msg.guild!.audio!;
        if (!player || !player.current) throw `I am not playing anything`;

        const response = await msg.send('Loading...');

        const queueDisplay = new RichDisplay(new MessageEmbed()
            .setColor(msg.member!.displayColor)
            .setTitle(`Music Queue for ${msg.guild!.name} ${player.repeat ? ' [Looping]' : ''}`)
            .addField(ZWS, `**Now Playing**
            [${player.current.info.title}](${player.current.info.uri}) \`${player.current.requester}\``)
            .setFooter(`**${player.tracks.length}** song(s) in queue | \`${Util.formatDuration(player.totalTime())}\` Expected length`));

        const songFields = player.tracks.map((track, position) => this.generateSongField(msg, position, track));

        for (const page of util.chunk(songFields, 5)) {
            queueDisplay.addPage((embed: MessageEmbed) => embed.setDescription(page.join('\n\n')));
        }

        await queueDisplay.run(response);
        return response;
    }

    private generateSongField(msg: KlasaMessage, position: number, track: AudioTrack) {
        const { title, uri } = track.info;
        return msg.language.get('COMMAND_QUEUE_LINE', position + 1, track.friendlyDuration, title, uri, track.requester);
    }

}
