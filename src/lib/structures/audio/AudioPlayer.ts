import AudioTrack from './AudioTrack';
import Util from '../../utils/Util';
import { KlasaMessage, KlasaGuild } from 'klasa';
import { VoiceChannel, TextChannel } from 'discord.js';
import SnakeBot from '../../client';

export default class AudioPlayer {

    public current?: AudioTrack;
    public guild: KlasaGuild;
    public channelID?: string;
    public tracks: AudioTrack[] = [];

    public repeat = false;
    public bassboosted = false;

    private previousVolume: number | null = null;

    public constructor(guild: KlasaGuild) {
        this.guild = guild;
    }

    public get client() {
        return this.guild.client as SnakeBot;
    }

    public get manager() {
        return this.client.audio;
    }

    public get player() {
        return this.manager.lavalink.players.get(this.guild.id);
    }

    public get channel() {
        return this.channelID && this.guild.channels.get(this.channelID) as TextChannel;
    }

    public get totalTime() {
        let accumulator = 0;
        for (const track of this.tracks) {
            if (track.info.isStream) return -1;
            accumulator += track.info.length;
        }

        return accumulator;
    }

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

    public async join(voiceChannel: VoiceChannel) {
        const { node } = this.manager;
        if (!node) throw 'No lavalink nodes were initialised';

        const volume = this.guild.settings.get('music.volume') as number;
        this.manager.lavalink!.join({
            guild: this.guild.id,
            channel: voiceChannel.id,
            host: node.tag || node.host
        })
            .on('end', data => this.onEnd(data))
            .on('error', err => this.client.console.error(`An error has occured at ${this.guild.id}:\n${err}`));

        await this.player!.volume(volume);
        return this;
    }

    public async leave() {
        this.tracks = [];
        this.channelID = undefined;
        this.repeat = false;
        this.bassboosted = false;
        this.previousVolume = null;

        return this.manager.lavalink.leave(this.guild.id);
    }

    public async bassboost(state?: boolean) {
        if (!this.player) throw 'No Audio player was initialised';

        this.bassboosted = state || !this.bassboosted;
        if (this.bassboosted) {
            this.previousVolume = this.player.state.volume;
            await this.player.volume(150);

            await this.player.equalizer(Array(6).fill(0).map((_, i) => ({ band: i, gain: i })));
        } else {
            if (this.previousVolume) await this.player.volume(this.previousVolume);
            await this.player.equalizer(Array(6).fill(0).map((_, i) => ({ band: i, gain: 0 })));
        }

        return state || this.bassboosted;
    }

    public handleTrack(msg: KlasaMessage, track: AudioTrack) {
        if (!this.player) throw 'No Audio player was initialised';

        track.requester = msg.author.tag;
        if (!this.current) {
            this.current = track;
            return this.player.play(track.track);
        }

        this.tracks.push(track);
    }

    private onEnd(data: any) {
        try {
            if (!this.player || data.reason === 'REPLACED') return;
            if (this.repeat) this.tracks.push(this.current!);
            if (this.tracks.length) {
                this.current = this.tracks.shift()!;

                return this.player.play(this.current.track);
            }

            return this.leave();
        } catch (err) {
            this.client.emit('wtf', this.guild.id, this.player?.node, err);
            if (this.channel) return this.channel.sendLocale('COMMAND_ERROR');
        }
    }

}
