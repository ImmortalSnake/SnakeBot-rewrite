import { KlasaMessage } from 'klasa';
import { User } from 'discord.js';

// BAse Audio Track

export default class AudioTrack {
    votes: any[];
    requester: string;
    track: any;
    identifier: any;
    thumbnail: string;
    length: { parsed: any; millis: any; };
    author: any;
    isSeekable: any;
    title: any;
    uri: any;

    constructor(msg: KlasaMessage, LavalinkTrack: any) {
        this.requester = (msg.author as User).id;
        this.track = LavalinkTrack.track;
        this.votes = [];

        this.identifier = LavalinkTrack.info.identifier;
        this.isSeekable = LavalinkTrack.info.isSeekable;
        this.thumbnail = `https://i.ytimg.com/vi/${this.identifier}/mqdefault.jpg`;
        this.author = LavalinkTrack.info.author;
        this.length = { parsed: LavalinkTrack.info.length, millis: LavalinkTrack.info.length };
        this.title = LavalinkTrack.info.title;
        this.uri = LavalinkTrack.info.uri;
    }

}
