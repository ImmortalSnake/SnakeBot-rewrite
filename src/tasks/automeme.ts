import { Task } from 'klasa';
import { TextChannel } from 'discord.js';
import SnakeBot from '../lib/client';

export default class extends Task {

    public async run({ channel }: { channel: string }) {
        const chan = this.client.channels.cache.get(channel) as TextChannel;
        if (!chan) return;

        await (this.client as SnakeBot).meme.meme(channel).catch(() => null);
    }

}
