import { Event, EventStore } from 'klasa';
import SnakeBot from '../../lib/client';
import { LavalinkNode } from 'discord.js-lavalink';

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, {
            emitter: (store.client as SnakeBot).audio.lavalink
        });
    }

    public run(node: LavalinkNode, err: Error) {
        this.client.console.warn(`There was an error at Lavalink Node ${node.tag}:\n${err}`);
    }

}
