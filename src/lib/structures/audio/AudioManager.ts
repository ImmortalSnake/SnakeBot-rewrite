import SnakeBot from '../../client';
import fetch from 'node-fetch';
import { PlayerManager, LavalinkNodeOptions, PlayerManagerOptions } from 'discord.js-lavalink';
import AudioTrack from './AudioTrack';

export default class AudioManager extends PlayerManager {

    public client: SnakeBot;
    public constructor(client: SnakeBot, nodes: LavalinkNodeOptions[], options: PlayerManagerOptions) {
        super(client, nodes, options);
        this.client = client;

        // listen for all events
        this
            .on('ready', node => this.client.console.log(`Successfully initialised Lavalink node: ${node.tag}`))
            .on('reconnecting', node => this.client.console.log(`Attempting to reconnect to Lavalink Node ${node.tag}`))
            .on('error', (node, err) => this.client.console.warn(`There was an error at Lavalink Node ${node.tag}:\n${err}`))
            .on('disconnect', (node, code, reason) => this.client.console.warn(`Disconnected from Lavalink Node ${node.tag}\nCode: ${code}\nReason: ${reason}`));
    }

    public get node() {
        return this.idealNodes.first();
    }

    public async fetchSongs(query: string): Promise<AudioTrack[]> {
        if (!this.node?.connected) throw 'No lavalink nodes were initialised';
        const params = new URLSearchParams({ identifier: query });

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
                this.client.console.error(err);
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
