import { Player, PlayerOptions, LavalinkNode } from 'discord.js-lavalink';
import AudioTrack from './AudioTrack';
import Util from '../../utils/Util';
import { KlasaMessage } from 'klasa';

export default class AudioPlayer extends Player {

    public current: AudioTrack | null = null;
    public tracks: AudioTrack[] = [];

    public repeat = false;
    public bassboosted = false;

    private previousVolume: number | null = null;

    public constructor(node: LavalinkNode, options: PlayerOptions) {
        super(node, options);

        // this.setVolume(this.volume);

        this.on('end', data => this.onEnd(data));
        this.on('error', err => console.error(err));
    }
    /*
    public setVolume(volume: number) {
        this.volume = volume;
        return super.volume(volume);
    }
*/

    public setRepeat(loop?: boolean) {
        this.repeat = loop || !this.repeat;
    }

    public shuffle() {
        this.tracks = Util.shuffle(this.tracks);
        return this.tracks;
    }

    public removeDupes() {
        this.tracks = this.tracks.filter(
            (track, index) => this.tracks.findIndex(t => t.track === track.track) === index
        );

        return this.tracks;
    }

    public async bassboost(state?: boolean) {
        this.bassboosted = state || !this.bassboosted;
        if (this.bassboosted) {
            this.previousVolume = this.state.volume;
            await this.volume(150);

            await this.equalizer(Array(6).fill(0).map((_, i) => ({ band: i, gain: i })));
        } else {
            if (this.previousVolume) await this.volume(this.previousVolume);
            await this.equalizer(Array(6).fill(0).map((_, i) => ({ band: i, gain: 0 })));
        }

        return state || this.bassboosted;
    }

    public totalTime() {
        let accumulator = 0;
        for (const track of this.tracks) {
            if (track.info.isStream) return -1;
            accumulator += track.info.length;
        }

        return accumulator;
    }

    public handleTrack(msg: KlasaMessage, track: AudioTrack) {
        track.requester = msg.author.tag;
        if (!this.current) {
            this.current = track;
            console.log(track);
            return this.play(track.track);
        }

        this.tracks.push(track);
    }

    public onEnd(data: any) {
        try {
            if (data.reason === 'REPLACED') return;
            if (this.repeat) this.tracks.push(this.current!);
            if (this.tracks.length) {
                this.current = this.tracks.shift()!;

                return this.play(this.current.track);
            }

            return this.manager.leave(this.id);
        } catch (err) {
            throw err;
        }
    }

}
