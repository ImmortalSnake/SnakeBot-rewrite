import { Task } from 'klasa';
import { TextChannel } from 'discord.js';
import SnakeBot from '../lib/client';

export default class extends Task {

    async run ({ channel }: { channel: string }) {
        const chan = this.client.channels.get(channel) as TextChannel;
        if (!chan) return;

        const { enabled, limit} = chan.guild.settings.get('automeme');
        if (!enabled) return;

        await (this.client as SnakeBot).meme.meme(channel);
        this.client.schedule.create('automeme', limit, {
            data: { channel },
            catchUp: true
        });
    }
}
