import { Event } from 'klasa';

export default class extends Event {

    public run(err: { code: number; reason: string }) {
        this.client.console.error(`Disconnected from discord - ${err.code}\n${err.reason}`);
    }

}
