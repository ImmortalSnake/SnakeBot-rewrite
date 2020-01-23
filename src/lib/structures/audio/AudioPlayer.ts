import { Player, PlayerManager } from 'discord.js-lavalink';
import AudioTrack from './AudioTrack';
import Util from '../../utils/Util';
import { KlasaMessage } from 'klasa';
import { Guild, VoiceChannel } from 'discord.js';

export default class AudioPlayer {

    public player: Player;
    public manager: PlayerManager;
    public channel: VoiceChannel;
    public current: AudioTrack | null = null;
    public tracks: AudioTrack[] = [];

    public repeat = false;
    public volume = 10;

    public constructor(channel: VoiceChannel, player: Player) {

        this.player = player;
        this.manager = player.manager;
        this.channel = channel;

        this.player.volume(this.volume);
    }

    public setVolume(volume: number) {
        this.volume = volume;
        return this.player.volume(volume);
    }

    public setRepeat(loop?: boolean) {
        this.repeat = loop || !this.repeat;
    }

    public shuffle() {
        this.tracks = Util.shuffle(this.tracks);
        return this.tracks;
    }

    public handleTrack(msg: KlasaMessage, track: AudioTrack) {
        track.requester = msg.author.tag;
        if (!this.current) {
            this.current = track;
            console.log(track);
            return this.play(msg.guild!, track);
        }

        this.tracks.push(track);
    }

    public play(guild: Guild, song: AudioTrack) {
        try {
            this.player.play(song.track);
            this.player.on('end', (data: any) => {
                if (data.reason === 'REPLACED') return;
                if (this.repeat && this.current) {
                    return this.play(guild, this.current);
                } else if (this.tracks.length) {
                    this.current = this.tracks.shift()!;
                    if (this.repeat) this.tracks.push(this.current);

                    return this.play(guild, this.current);
                }

                return this.manager.leave(guild.id);
            });
        } catch (err) {
            throw err;
        }
    }

}
