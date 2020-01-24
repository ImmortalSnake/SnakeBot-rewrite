import { Event, EventStore } from 'klasa';
import SnakeBot from '../../lib/client';
import { LavalinkNode } from 'discord.js-lavalink';

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, {
            emitter: (store.client as SnakeBot).audio.lavalink
        });
    }

    public run(node: LavalinkNode, code: number, reason: string) {
        this.client.console.warn(`Disconnected from Lavalink Node ${node.tag}\nCode: ${code}\nReason: ${reason}`);
    }

}
