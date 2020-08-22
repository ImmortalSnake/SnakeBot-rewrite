import { Event } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Event {

    public async run() {
        await (this.client as SnakeBot).audio.connect().catch(err => console.error(err));
        if (this.client.options.production) await (this.client as SnakeBot).webhook.send(`Ready to serve ${this.client.guilds.cache.size} guilds`);
    }

}
