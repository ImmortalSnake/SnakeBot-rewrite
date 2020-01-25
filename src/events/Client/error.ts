import { Event } from 'klasa';

export default class extends Event {

    public run(err: Error) {
        this.client.console.error(`Encountered an error:\n${err}`);
    }

}
