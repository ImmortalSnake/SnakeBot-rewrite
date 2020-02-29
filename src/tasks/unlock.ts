import { Task } from 'klasa';
import { TextChannel } from 'discord.js';

export default class extends Task {

    public async run({ channelID }: { channelID: string }) {
        const channel = this.client.channels.get(channelID) as TextChannel;

        if (!channel?.manageable) return null;
        return channel.updateOverwrite(channel.guild.id, { SEND_MESSAGES: true });
    }

}
