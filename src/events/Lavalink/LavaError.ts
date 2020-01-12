import { Event, EventStore } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, {
            emitter: (store.client as SnakeBot).audio.shoukaku,
            event: 'error'
        });

    }

    public run(node: string, error: Error) {
        console.log(`Lavalink node ${node} emitted an error: ${error}`);
    }

}
