import { Task } from 'klasa';
import { TextChannel } from 'discord.js';
import SnakeBot from '../lib/client';

export default class extends Task {

    public async run({ channel }: { channel: string }) {
        const chan = this.client.channels.get(channel) as TextChannel;
        if (!chan) return;

        const { enabled, limit } = chan.guild.settings.get('automeme') as any;
        if (!enabled) return;

        await (this.client as SnakeBot).meme.meme(channel);
        await this.client.schedule.create('automeme', Date.now() + (limit * 60 * 1000), {
            data: { channel },
            catchUp: true
        });
    }

}
