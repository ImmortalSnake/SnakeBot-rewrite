import SnakeBot from '../../client';
import fetch from 'node-fetch';
import { Manager, ManagerOptions, LavalinkNodeOptions, TrackData, PlaylistInfo } from '@lavacord/discord.js';
import AudioTrack from './AudioTrack';

export default class AudioManager extends Manager {

    public readonly client: SnakeBot;
    public constructor(client: SnakeBot, nodes: LavalinkNodeOptions[], options: ManagerOptions) {
        super(client, nodes, options);
        this.client = client;

        // listen for all events
        this
            .on('ready', node => this.client.console.log(`Successfully initialised Lavalink node: ${node.id}`))
            .on('reconnecting', node => this.client.console.log(`Attempting to reconnect to Lavalink Node ${node.id}`))
            .on('error', (err, node) => this.client.console.warn(`There was an error at Lavalink Node ${node.id}:\n${err}`))
            .on('disconnect', (data, node) => this.client.console.warn(`Disconnected from Lavalink Node ${node.id}\nCode: ${data.code}\nReason: ${data.reason}`));
    }

    public get node() {
        return this.idealNodes[0];
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
    }

}


interface LavalinkLoadTracksResult {
    status?: number;
    loadType: 'TRACK_LOADED' | 'PLAYLIST_LOADED' | 'SEARCH_RESULT' | 'NO_MATCHES' | 'LOAD_FAILED';
    tracks: TrackData[];
    playlistInfo: PlaylistInfo;
    exception?: {
        message: string;
        severity: string;
    };
}