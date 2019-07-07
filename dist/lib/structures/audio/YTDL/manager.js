"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Youtube = require('simple-youtube-api');
const youtubedl = require('youtube-dl');
const ytdl = require('ytdl-core-discord');
class YTDLAudioManager {
    constructor(client) {
        this.client = client;
        this.youtube = new Youtube(process.env.YT_KEY);
        this.queue = new discord_js_1.Collection();
        this.base = {
            bitrate: 'auto',
            volume: 5
        };
    }
    join(channel) {
        return channel.join().then((connection) => {
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
    leave(channel) {
        const guildq = this.queue.get(channel.guild.id);
        if (guildq)
            this.queue.delete(channel.guild.id);
        return channel.leave();
    }
    add(msg, { data, type }) {
        const gqueue = this.queue.get(msg.guild.id);
        gqueue.queue.push({
            id: type === 'youtube' ? data.id : data.url,
            skipReq: [],
            title: data.title,
            seek: 0,
            requestor: msg.author.id,
            url: type === 'youtube' ? data.url : data.webpage_url,
            type
        });
        return gqueue;
    }
    search(query, max = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = [];
            if (query.toLowerCase().indexOf('youtube.com') > -1) {
                const match = query.match(/[?&]list=([^#\\&\\?]+)/i);
                if (match) {
                    const playlist = yield this.youtube.getPlaylistByID(match[1]);
                    const videos = yield playlist.getVideos();
                    for (const video of videos) {
                        const v = yield this.youtube.getVideoByID(video.id);
                        res.push({ data: v, type: 'youtube' });
                    }
                }
                else {
                    const video = yield this.youtube.getVideo(query.toLowerCase());
                    res.push({ data: video, type: 'youtube' });
                }
            }
            else if (query.toLowerCase().indexOf('http') > -1) {
                youtubedl.getInfo(query.toLowerCase(), (err, data) => {
                    if (err)
                        throw err;
                    res.push({ data, type: 'any' });
                });
            }
            else {
                const videos = yield this.youtube.searchVideos(query.toLowerCase(), max);
                videos.forEach((video) => res.push({ data: video, type: 'youtube' }));
            }
            return res;
        });
    }
    getStream(guildq, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = guildq.queue[0];
            try {
                if (video.type === 'youtube') {
                    const stream = yield ytdl(`https://www.youtube.com/watch?v=${video.id}`, { filter: 'audioonly' });
                    callback({ url: stream, options: { volume: guildq.volume, bitrate: this.base.bitrate, type: 'opus' } });
                }
                else {
                    youtubedl.getInfo(video.id, ['-q', '--no-warnings', '--force-ipv4'], (err, data) => {
                        if (err)
                            throw err;
                        callback({ url: data.url, options: { volume: guildq.volume, bitrate: this.base.bitrate } });
                    });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    load(msg, query, max = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield this.search(query, max).catch((err) => { throw err; });
            videos.forEach((video) => this.add(msg, video));
            console.log(videos);
            return videos;
        });
    }
    play(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const guildq = this.queue.get(msg.guild.id);
            if (!guildq.connection) {
                if (msg.member && msg.member.voice.channel)
                    guildq.connection = yield this.join(msg.member.voice.channel);
                else
                    return null;
            }
            this.getStream(guildq, (stream) => {
                guildq.dispatcher = guildq.connection.play(stream.url, stream.options);
                guildq.current = guildq[0];
                guildq.dispatcher.on('end', () => {
                    if (guildq.looping)
                        return this.play(msg);
                    else
                        guildq.current = guildq.queue.shift();
                    if (!guildq.current)
                        return this.leave(msg.guild.channels.get(guildq.channel));
                    else
                        return this.play(msg);
                });
            });
        });
    }
    setVolume(guildID, volume) {
        return __awaiter(this, void 0, void 0, function* () {
            const guildq = this.queue.get(guildID);
            guildq.dispatcher.setVolume(volume);
            guildq.volume = volume;
            return guildq;
        });
    }
}
exports.default = YTDLAudioManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc3RydWN0dXJlcy9hdWRpby9ZVERML21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDJDQUFvRjtBQUdwRixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM5QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFMUMsTUFBcUIsZ0JBQWdCO0lBTWpDLFlBQWEsTUFBZ0I7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRztZQUNSLE9BQU8sRUFBRSxNQUFNO1lBQ2YsTUFBTSxFQUFFLENBQUM7U0FDWixDQUFDO0lBQ04sQ0FBQztJQUVNLElBQUksQ0FBQyxPQUFxQjtRQUM3QixPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUEyQixFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQ3hCLEtBQUssRUFBRSxFQUFFO2dCQUNULE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUU7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