import SnakeBot from '../../client';
import { PlayerManager, Player } from 'discord.js-lavalink';
import { musicOptions } from '../../../config';
import { VoiceChannel, Guild, Collection, User } from 'discord.js';
import AudioTrack from './track';
import { KlasaMessage, util } from 'klasa';
import fetch from 'node-fetch';
import LavaAudioPlayer from './player';
const Youtube = require('simple-youtube-api');

export default class LavaAudioManager {
    player: PlayerManager;
    nodes: { host: string; port: string; password: string; }[];
    youtube: any;
    queue: Collection<unknown, unknown>;

    constructor(client: SnakeBot) {
        this.youtube = new Youtube(process.env.YT_KEY);
        this.nodes = musicOptions.nodes;
        this.queue = new Collection();
        this.player = new PlayerManager(client, this.nodes, {
            user: client.id,
            shards: 1
        }).on('error', console.log);
    }

    public async leave(guild: Guild) {
        const guildq = this.queue.get(guild.id) as any;
        if (guildq) this.queue.delete(guild.id);
        return this.player.leave(guild.id);
    }

    public async join(channel: VoiceChannel) {
        this.queue.set(channel.guild.id, {
            current: null,
            repeat: false,
            queue: [],
            last: [],
            channel: channel.id,
            volume: 5,
            message: null
        });

        return this.player.join({
            channel: channel.id,
            guild: channel.guild.id,
            host: this.nodes[0].host
        }, { selfdeaf: true });
    }

    public async ytsearch(msg: KlasaMessage, query: string, max = 1) {
        const tracks = [];
        const videos = await this.youtube.searchVideos(query, max).catch(console.log);
        for (const video of videos) {
            let track = await this.lavaSearch(msg, `https://youtube.com/watch?v=${video.id}`, 1).catch(console.log);
            if (!track) return null;
            if (max === 1) return track;
            tracks.push(track);
        }
        return tracks;
    }

    public async lavaSearch(msg: KlasaMessage, query: string, max = 1) {
        let audio: any[] = [];
        return fetch(`http://${this.nodes[0].host}:${this.nodes[0].port}/loadtracks?identifier=${query}`,  {
            headers: {
                authorization: this.nodes[0].password
            }
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            let tracks = res.tracks;
            switch (res.loadType) {
                case 'TRACK_LOADED':
                    audio.push(new AudioTrack(msg, tracks[0]));
                    return audio;
                case 'PLAYLIST_LOADED':
                    let playlist = tracks.slice(0, max);
                    playlist.forEach((p: any) => audio.push(new AudioTrack(msg, p)));
                    playlist.unshift(res.playlistInfo);
                    return audio;
                case 'SEARCH_RESULT':
                    tracks.slice(0, max).forEach((t: any) => audio.push(new AudioTrack(msg, t)));
                    return audio;
                case 'NO_MATCHES': case 'LOAD_FAILED':
                if (max === 1) throw `Could not load the track`;
            }
        }).catch(console.log);
    }

    private add(msg: KlasaMessage, track: any) {
        const gqueue = this.queue.get((msg.guild as Guild).id) as any;
        if (!this.queue) return;
        gqueue.queue.push(track);
        return gqueue;
    }

    public async load(msg: KlasaMessage, query: string, max = 1) {
        const videos = await this._load(msg, query, max);
        if (!videos) throw 'No videos to load';
        videos.forEach((video: any) => this.add(msg, video));
        return videos;
    }


    public async _load(msg: KlasaMessage, query: string, max = 1) {
        const url = query.split(' ')[0];
        if (url.match(/^https:?:\/\/\/(www.youtube.com|youtube.com|youtu.be)\/watch(.*)$/g)) return this.lavaSearch(msg, query, max);
        else if (url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/)) throw 'No Playlist support';
        else if (url.match(/^(https|http):?:\/\/\/soundcloud.com\//g)) return this.lavaSearch(msg, query, max);
        else if (url.match(/^(https|http)\:\/\/open\.spotify\.com\/track\/.+/g)) return this.lavaSearch(msg, query, max);
        else return this.ytsearch(msg, query, max);
    }

    public async play(msg: KlasaMessage, track: AudioTrack) {
        const player = this.player.players.get((msg.guild as Guild).id) as Player;
        const guildq = this.queue.get((msg.guild as Guild).id) as any;
        if (!track || !player || !guildq) throw 'Track not loaded';
        console.log(player.toString());
        player.play(guildq.queue[0].track).catch(console.log);
        player.on('end', async (res: any) => {
            if (res.reason === 'REPLACED') return;
            if (res.reason === 'LOAD_FAILED') throw 'Could not load the track';
            if (!guildq.repeat) {
                guildq.last.unshift(guildq.current);
                guildq.current = guildq.queue.shift();
            }
            if (!guildq.current) return await this.leave(msg.guild as Guild);
            await player.play(guildq.current.track);
        });
    }

    public async loadTrack(msg: KlasaMessage, track: AudioTrack) {
        let player = this.player.players.get((msg.guild as Guild).id);
        const gqueue = this.queue.get((msg.guild as Guild).id) as any;
        gqueue.queue.push(track);
        return this.play(msg, track.track);
    }
}
