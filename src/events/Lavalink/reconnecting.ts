import { Event, EventStore } from 'klasa';
import SnakeBot from '../../lib/client';
import { LavalinkNode } from 'discord.js-lavalink';

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, {
            emitter: (store.client as SnakeBot).audio.lavalink
        });
    }

    public run(node: LavalinkNode) {
        this.client.console.log(`Attempting to reconnect to Lavalink Node ${node.tag}`);
    }

}
