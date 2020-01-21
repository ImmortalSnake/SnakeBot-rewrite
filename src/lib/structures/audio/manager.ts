import SnakeBot from '../../client';
import fetch from 'node-fetch';
import { PlayerManager, Player } from 'discord.js-lavalink';
import { LavalinkServer } from '../../../config';
import { VoiceChannel, Guild, Collection } from 'discord.js';
import AudioTrack from './AudioTrack';
import { KlasaMessage } from 'klasa';

interface AudioPlayer {
    tracks: AudioTrack[];
    repeat: boolean;
    player: Player;
    volume: number;
    current: AudioTrack | null;
}

export default class AudioManager {

    public client: SnakeBot;
    public lavalink: PlayerManager;
    public players: Collection<string, AudioPlayer>;

    public constructor(client: SnakeBot) {
        this.client = client;
        this.players = new Collection();
        this.lavalink = new PlayerManager(this.client, LavalinkServer, {
            user: client.id,
            shards: client.shardCount
        });

    }

    public get node() {
        return this.lavalink.nodes.first()!;
    }

    public async join(channel: VoiceChannel) {
        const volume = 10;
        const player = await this.lavalink.join({
            guild: channel.guild.id,
            channel: channel.id,
            host: LavalinkServer[0].host
        }, { selfdeaf: true });

        player.volume(volume);

        return this.players.set(channel.guild.id, {
            tracks: [],
            repeat: false,
            current: null,
            volume,
            player
        });
    }

    public leave(guild: Guild) {
        this.players.delete(guild.id);
        return this.lavalink.leave(guild.id);
    }

    public setVolume(guild: Guild, volume: number) {
        const audio = this.players.get(guild.id);
        if (!audio) throw `I am not in any voice channel!`;

        return audio.player.volume(volume);
    }

    public async fetchSongs(query: string) {
        const params = new URLSearchParams();
        params.append('identifier', query);

        return fetch(`http://${this.node.host}:${this.node.port}/loadtracks?${params.toString()}`, {
            headers: { Authorization: this.node.password! }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 400) {
                    throw 'Could not load the track!';
                } else if (data.loadType === 'SEARCH_RESULT') {
                    return data.tracks.map((track: any) => new AudioTrack(track));
                }

                return [];
            })
            .catch(err => {
                console.error(err);
                return null;
            });
    }

    public handleTrack(msg: KlasaMessage, track: AudioTrack) {
        const audio = this.players.get(msg.guild!.id);
        if (!audio) throw 'I am not connected to any voice channel';

        track.requester = msg.author.tag;
        if (!audio.current) {
            audio.current = track;
            console.log(track);
            return this.play(msg.guild!, track);
        }

        audio.tracks.push(track);
    }

    public play(guild: Guild, song: AudioTrack) {
        const audio = this.players.get(guild.id);
        if (!audio) throw 'I am not connected to any voice channel';

        try {
            audio.player.play(song.track);
            audio.player.on('end', (data: any) => {
                if (data.reason === 'REPLACED') return;
                if (audio.repeat && audio.current) {
                    return this.play(guild, audio.current);
                } else if (audio.tracks.length) {
                    audio.current = audio.tracks.shift()!;
                    return this.play(guild, audio.current);
                }

                return this.leave(guild);
            });
        } catch (err) {
            throw err;
        }
    }

}

