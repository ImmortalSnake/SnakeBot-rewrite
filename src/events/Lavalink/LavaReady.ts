import { Event, EventStore } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, {
            emitter: (store.client as SnakeBot).audio.shoukaku,
            event: 'ready'
        });

    }

    public run(node: string) {
        console.log(`Lavalink node: ${node} is successfully initialized`);
    }

}
