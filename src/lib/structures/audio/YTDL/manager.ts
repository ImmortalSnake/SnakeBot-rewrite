import SnakeBot from '../../../client';
import { Collection, VoiceChannel, VoiceConnection, Guild, User } from 'discord.js';
import { KlasaMessage } from 'klasa';

const Youtube = require('simple-youtube-api');
const youtubedl = require('youtube-dl');
const ytdl = require('ytdl-core-discord');

export default class YTDLAudioManager {
    queue: Collection<unknown, unknown>;
    youtube: any;
    client: SnakeBot;
    base: any;

    constructor (client: SnakeBot) {
        this.client = client;
        this.youtube = new Youtube(process.env.YT_KEY);
        this.queue = new Collection();
        this.base = {
            bitrate: 'auto',
            volume: 5
        };
    }

    public join(channel: VoiceChannel): Promise<VoiceConnection> {
        return channel.join().then((connection: VoiceConnection) => {
            this.queue.set(channel.guild.id, {
                volume: this.base.volume,
                queue: [],
                looping: false,
                current: null,
                dispatcher: null,
                channel: channel.id,
                connection
            });

            return connection;
        });
    }

    public leave(channel: VoiceChannel) {
        const guildq = this.queue.get(channel.guild.id) as any;
        if (guildq) this.queue.delete(channel.guild.id);

        return channel.leave();
    }

    private add(msg: KlasaMessage, { data, type }: any) {
        const gqueue = this.queue.get((msg.guild as Guild).id) as any;
        gqueue.queue.push({
            id: type === 'youtube' ? data.id : data.url,
            skipReq: [],
            title: data.title,
            seek: 0,
            requestor: (msg.author as User).id,
            url: type === 'youtube' ? data.url : data.webpage_url,
            type
        });
        return gqueue;
    }

    public async search(query: string, max = 1): Promise<any[]> {
        const res = [];

        if (query.toLowerCase().indexOf('youtube.com') > -1) {
            const match = query.match(/[?&]list=([^#\\&\\?]+)/i);
            if (match) {
                const playlist = await this.youtube.getPlaylistByID(match[1]);
                const videos = await playlist.getVideos();
                for (const video of videos) {
                    const v = await this.youtube.getVideoByID(video.id);
                    res.push({ data: v, type: 'youtube' });
                }
            } else {
                const video = await this.youtube.getVideo(query.toLowerCase());
                res.push({ data: video, type: 'youtube' });
            }
        } else if (query.toLowerCase().indexOf('http') > -1) {
            youtubedl.getInfo(query.toLowerCase(), (err: any, data: any) => {
                if (err) throw err;
                res.push({ data, type: 'any' });
            });
        } else {
            const videos = await this.youtube.searchVideos(query.toLowerCase(), max);
            videos.forEach((video: any) => res.push({ data: video, type: 'youtube' }));
        }

        return res;
    }

    private async getStream(guildq: any, callback: Function) {
        const video = guildq.queue[0];
        try {
            if (video.type === 'youtube') {
                const stream = await ytdl(`https://www.youtube.com/watch?v=${video.id}`, { filter: 'audioonly' });
                callback({ url: stream, options: { volume: guildq.volume, bitrate: this.base.bitrate, type: 'opus' } });
            } else {
                youtubedl.getInfo(video.id, ['-q', '--no-warnings', '--force-ipv4'], (err: any, data: any) => {
                    if (err) throw err;
                    callback({ url: data.url, options: { volume: guildq.volume, bitrate: this.base.bitrate } });
                });
            }
        } catch (err) {
            throw err;
        }
    }

    public async load(msg: KlasaMessage, query: string, max = 1) {
        const videos = await this.search(query, max).catch((err) => { throw err; });
        videos.forEach((video: any) => this.add(msg, video));
        console.log(videos);
        return videos;
    }

    public async play(msg: KlasaMessage) {
        const guildq = this.queue.get((msg.guild as Guild).id) as any;
        if (!guildq.connection) {
            if (msg.member && msg.member.voice.channel) guildq.connection = await this.join(msg.member.voice.channel);
            else return null;
        }

        this.getStream(guildq, (stream: any) => {
            guildq.dispatcher = guildq.connection.play(stream.url, stream.options);
            guildq.current = guildq[0];

            guildq.dispatcher.on('end', () => {
                if (guildq.looping) return this.play(msg);
                else guildq.current = guildq.queue.shift();

                if (!guildq.current) return this.leave((msg.guild as Guild).channels.get(guildq.channel) as VoiceChannel);
                else return this.play(msg);
            });
        });
    }

    public async setVolume(guildID: string, volume: number) {
        const guildq = this.queue.get(guildID) as any;
        guildq.dispatcher.setVolume(volume);
        guildq.volume = volume;
        return guildq;
    }
}
