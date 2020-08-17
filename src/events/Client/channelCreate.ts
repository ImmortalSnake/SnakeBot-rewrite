import { Event, util } from 'klasa';
import { DMChannel, GuildChannel, TextChannel, MessageEmbed } from 'discord.js';

export default class extends Event {

    public async run(channel: DMChannel | GuildChannel) {
        if (channel instanceof DMChannel) return null;

        const chanID = channel.guild.settings.get('channels.log') as string;
        const logChannel = channel.guild.channels.cache.get(chanID) as TextChannel;

        if (!logChannel?.postable || !logChannel.embedable) return null;
        return logChannel.send(new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Channel Created')
            .setDescription(`A ${util.toTitleCase(channel.type)} channel \`${channel.name}\` (${channel.id}) was created${channel.parent ? ` in ${channel.parent.name}` : ''}.`)
            .setTimestamp());
    }

}
