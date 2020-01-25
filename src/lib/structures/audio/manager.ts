import SnakeBot from '../../client';
import fetch from 'node-fetch';
import { PlayerManager, Player } from 'discord.js-lavalink';
import { LavalinkServer } from '../../../config';
import { VoiceChannel, Guild, Collection } from 'discord.js';
import AudioTrack from './AudioTrack';
import AudioPlayer from './AudioPlayer';

export default class AudioManager {

    public client: SnakeBot;
    public lavalink: PlayerManager;
    public players: Collection<string, AudioPlayer>;

    public constructor(client: SnakeBot) {
        this.client = client;
        this.players = new Collection();
        this.lavalink = new PlayerManager(this.client, LavalinkServer, {
            user: client.id,
            shards: client.shardCount,
            Player: AudioPlayer as unknown as Player
        })
            .on('ready', node => this.client.console.log(`Successfully initialised Lavalink node: ${node.tag}`))
            .on('reconnecting', node => this.client.console.log(`Attempting to reconnect to Lavalink Node ${node.tag}`))
            .on('error', (node, err) => this.client.console.warn(`There was an error at Lavalink Node ${node.tag}:\n${err}`))
            .on('disconnect', (node, code, reason) => this.client.console.warn(`Disconnected from Lavalink Node ${node.tag}\nCode: ${code}\nReason: ${reason}`));

    }

    public get node() {
        return this.lavalink.nodes.first();
    }

    public join(channel: VoiceChannel) {
        if (!this.node?.connected) throw new Error('No lavalink nodes were initialised');
        const player = this.lavalink.join({
            guild: channel.guild.id,
            channel: channel.id,
            host: this.node.tag || this.node.host
        }, { selfdeaf: true });

        return this.players.set(channel.guild.id, player as AudioPlayer);
    }

    public leave(guild: Guild) {
        this.players.delete(guild.id);
        guild.me?.voice.channel?.leave();

        return this.lavalink.leave(guild.id);
    }

    public async fetchSongs(query: string) {
        if (!this.node) throw new Error('No lavalink nodes were initialised');
        const params = new URLSearchParams();
        params.append('identifier', query);

        return fetch(`http://${this.node.host}:${this.node.port}/loadtracks?${params.toString()}`, {
            headers: { Authorization: this.node.password! }
        })
            .then(res => res.json())
            .then((data: LavalinkLoadTracksResult) => {
                if (data.status === 400) {
                    throw 'Could not load the track!';
                } else if (data.loadType === 'NO_MATCHES') {
                    throw 'Could not fetch any search results';
                } else if (data.loadType === 'LOAD_FAILED') {
                    throw `Could not load the track!\nReason: ${data.exception!.message}`;

                } else if (['SEARCH_RESULT', 'TRACK_LOADED', 'PLAYLIST_LOADED'].includes(data.loadType)) {
                    return data.tracks.map(track => new AudioTrack(track, data.playlistInfo));
                }

                return [];
            })
            .catch(err => {
                console.error(err);
                throw 'An error has occurred... Try again later!';
            });
    }

}


interface LavalinkLoadTracksResult {
    status?: number;
    loadType: 'TRACK_LOADED' | 'PLAYLIST_LOADED' | 'SEARCH_RESULT' | 'NO_MATCHES' | 'LOAD_FAILED';
    tracks: LavalinkTrackLoaded[];
    playlistInfo: LavalinkPlaylistInfo;
    exception?: {
        message: string;
        severity: string;
    };
}

export interface LavalinkTrackLoaded {
    track: string;
    info: {
        identifier: string;
        isSeekable: boolean;
        author: string;
        length: number;
        isStream: boolean;
        position: number;
        title: string;
        uri: string;
    };
}

export interface LavalinkPlaylistInfo {
    name?: string;
    selectedTrack?: number;
}
