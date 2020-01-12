import SnakeBot from '../../client';
import { Shoukaku, ShoukakuSocket, Track, LoadTrackResponse } from 'shoukaku';
import Queue from './queue';
import { KlasaMessage } from 'klasa';
import { LavalinkServer } from '../../../config';

export default class AudioManager {

    public client: SnakeBot;
    public shoukaku: Shoukaku;
    public queue: Queue;

    public constructor(client: SnakeBot) {

        this.client = client;

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.shoukaku = new Shoukaku(client, LavalinkServer, {
            moveOnDisconnect: false,
            resumable: false,
            resumableTimeout: 30,
            reconnectTries: 2,
            restTimeout: 60000
        });

        this.queue = new Queue(client);
    }

    public get node(): ShoukakuSocket {
        return this.shoukaku.getNode();
    }

    public async play(msg: KlasaMessage, query: string, search: 'youtube' | 'soundcloud' = 'youtube') {
        const tracks = await this.node.rest.resolve(query, search);
        if (!tracks) throw 'Sorry, Could not find anything with that query';

        if (Array.isArray(tracks)) {
            const res = await this.queue.handle(this.node, tracks.shift()!, msg);

            // handle rest of them
            for (const track of tracks) {
                await this.queue.handle(this.node, track, msg);
            }

            if (res) await res.play();

            return tracks;
        }
        let track;

        if ((tracks as LoadTrackResponse).tracks) [track] = (tracks as LoadTrackResponse).tracks;
        else track = tracks as Track;

        const res = await this.queue.handle(this.node, track, msg);
        if (res) await res.play();

        return track;

    }

}
