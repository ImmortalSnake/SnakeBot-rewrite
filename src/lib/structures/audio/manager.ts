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
    public youtube: YoutubeAPI;

    public constructor(client: SnakeBot) {
        this.client = client;
        this.players = new Collection();
        this.lavalink = new PlayerManager(this.client, LavalinkServer, {
            user: client.id,
            shards: client.shardCount,
            Player: AudioPlayer as unknown as Player
        });

    }

    public get node() {
        return this.lavalink.nodes.first()!;
    }

    public join(channel: VoiceChannel) {
        const player = this.lavalink.join({
            guild: channel.guild.id,
            channel: channel.id,
            host: LavalinkServer[0].host
        }, { selfdeaf: true });

        return this.players.set(channel.guild.id, player as AudioPlayer);
    }

    public leave(guild: Guild) {
        this.players.delete(guild.id);
        guild.me?.voice.channel?.leave();

        return this.lavalink.leave(guild.id);
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

}

