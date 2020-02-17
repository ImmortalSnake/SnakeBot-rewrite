import { Event } from 'klasa';
import SnakeBot from '../../lib/client';
import { SnakeBotConfig } from '../../config';

export default class extends Event {

    public run() {
        if (SnakeBotConfig.Lavalink) (this.client as SnakeBot).audio.init();
    }

}
