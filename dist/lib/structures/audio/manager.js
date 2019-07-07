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
            const videos = yield this.youtube.searchVideos(query, max);
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