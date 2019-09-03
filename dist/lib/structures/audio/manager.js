"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_lavalink_1 = require("discord.js-lavalink");
const config_1 = require("../../../config");
const discord_js_1 = require("discord.js");
const track_1 = __importDefault(require("./track"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const Youtube = require('simple-youtube-api');
class LavaAudioManager {
    constructor(client) {
        this.youtube = new Youtube(process.env.YT_KEY);
        this.nodes = config_1.musicOptions.nodes;
        this.queue = new discord_js_1.Collection();
        this.player = new discord_js_lavalink_1.PlayerManager(client, this.nodes, {
            user: client.id,
            shards: 1
        }).on('error', console.log);
    }
    leave(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            const guildq = this.queue.get(guild.id);
            if (guildq)
                this.queue.delete(guild.id);
            return this.player.leave(guild.id);
        });
    }
    join(channel) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    ytsearch(msg, query, max = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const tracks = [];
            const videos = yield this.youtube.searchVideos(query, max).catch(console.log);
            for (const video of videos) {
                let track = yield this.lavaSearch(msg, `https://youtube.com/watch?v=${video.id}`, 1).catch(console.log);
                if (!track)
                    return null;
                if (max === 1)
                    return track;
                tracks.push(track);
            }
            return tracks;
        });
    }
    lavaSearch(msg, query, max = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let audio = [];
            return node_fetch_1.default(`http://${this.nodes[0].host}:${this.nodes[0].port}/loadtracks?identifier=${query}`, {
                headers: {
                    authorization: this.nodes[0].password
                }
            }).then(res => res.json())
                .then(res => {
                console.log(res);
                let tracks = res.tracks;
                switch (res.loadType) {
                    case 'TRACK_LOADED':
                        audio.push(new track_1.default(msg, tracks[0]));
                        return audio;
                    case 'PLAYLIST_LOADED':
                        let playlist = tracks.slice(0, max);
                        playlist.forEach((p) => audio.push(new track_1.default(msg, p)));
                        playlist.unshift(res.playlistInfo);
                        return audio;
                    case 'SEARCH_RESULT':
                        tracks.slice(0, max).forEach((t) => audio.push(new track_1.default(msg, t)));
                        return audio;
                    case 'NO_MATCHES':
                    case 'LOAD_FAILED':
                        if (max === 1)
                            throw `Could not load the track`;
                }
            }).catch(console.log);
        });
    }
    add(msg, track) {
        const gqueue = this.queue.get(msg.guild.id);
        if (!this.queue)
            return;
        gqueue.queue.push(track);
        return gqueue;
    }
    load(msg, query, max = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield this._load(msg, query, max);
            if (!videos)
                throw 'No videos to load';
            videos.forEach((video) => this.add(msg, video));
            return videos;
        });
    }
    _load(msg, query, max = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = query.split(' ')[0];
            if (url.match(/^https:?:\/\/\/(www.youtube.com|youtube.com|youtu.be)\/watch(.*)$/g))
                return this.lavaSearch(msg, query, max);
            else if (url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/))
                throw 'No Playlist support';
            else if (url.match(/^(https|http):?:\/\/\/soundcloud.com\//g))
                return this.lavaSearch(msg, query, max);
            else if (url.match(/^(https|http)\:\/\/open\.spotify\.com\/track\/.+/g))
                return this.lavaSearch(msg, query, max);
            else
                return this.ytsearch(msg, query, max);
        });
    }
    play(msg, track) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.player.players.get(msg.guild.id);
            const guildq = this.queue.get(msg.guild.id);
            if (!track || !player || !guildq)
                throw 'Track not loaded';
            console.log(player.toString());
            player.play(guildq.queue[0].track).catch(console.log);
            player.on('end', (res) => __awaiter(this, void 0, void 0, function* () {
                if (res.reason === 'REPLACED')
                    return;
                if (res.reason === 'LOAD_FAILED')
                    throw 'Could not load the track';
                if (!guildq.repeat) {
                    guildq.last.unshift(guildq.current);
                    guildq.current = guildq.queue.shift();
                }
                if (!guildq.current)
                    return yield this.leave(msg.guild);
                yield player.play(guildq.current.track);
            }));
        });
    }
    loadTrack(msg, track) {
        return __awaiter(this, void 0, void 0, function* () {
            let player = this.player.players.get(msg.guild.id);
            const gqueue = this.queue.get(msg.guild.id);
            gqueue.queue.push(track);
            return this.play(msg, track.track);
        });
    }
}
exports.default = LavaAudioManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvc3RydWN0dXJlcy9hdWRpby9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSw2REFBNEQ7QUFDNUQsNENBQStDO0FBQy9DLDJDQUFtRTtBQUNuRSxvREFBaUM7QUFFakMsNERBQStCO0FBRS9CLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRTlDLE1BQXFCLGdCQUFnQjtJQU1qQyxZQUFZLE1BQWdCO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLG1DQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2YsTUFBTSxFQUFFLENBQUM7U0FDWixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVZLEtBQUssQ0FBQyxLQUFZOztZQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFRLENBQUM7WUFDL0MsSUFBSSxNQUFNO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztR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