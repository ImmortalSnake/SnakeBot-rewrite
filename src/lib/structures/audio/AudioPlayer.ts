import { Player, PlayerManager } from 'discord.js-lavalink';
import AudioTrack from './AudioTrack';
import Util from '../../utils/Util';
import { KlasaMessage } from 'klasa';
import { VoiceChannel } from 'discord.js';

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
        this.player.on('end', data => this.onEnd(data));
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
            return this.player.play(track.track);
        }

        this.tracks.push(track);
    }

    public onEnd(data: any) {
        try {
            if (data.reason === 'REPLACED') return;
            if (this.repeat) this.tracks.push(this.current!);
            if (this.tracks.length) {
                this.current = this.tracks.shift()!;

                return this.player.play(this.current.track);
            }

            return this.manager.leave(this.channel.guild.id);
        } catch (err) {
            throw err;
        }
    }

}
