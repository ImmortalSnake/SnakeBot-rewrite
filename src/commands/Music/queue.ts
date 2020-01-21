import { KlasaMessage, RichDisplay, util } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { MessageEmbed } from 'discord.js';
import AudioTrack from '../../lib/structures/audio/AudioTrack';

export default class extends SnakeCommand {

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {

        const player = this.client.audio.players.get(msg.guild!.id);
        if (!player || !player.current) throw `I am not playing anything`;

        const response = await msg.send('Loading...');

        const queueDisplay = new RichDisplay(new MessageEmbed()
            .setColor(msg.member!.displayColor)
            .setTitle(`Music Queue for ${msg.guild!.name}`)
            .addField('Now Playing', `[${player.current.info.title}](${player.current.info.uri}) \`${player.current.requester}\``));

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

    private calculateTotalDuration(tracks: AudioTrack[]) {
        let accumulator = 0;
        for (const track of tracks) {
            if (track.info.isStream) return -1;
            accumulator += track.info.length;
        }

        return accumulator;
    }

}
