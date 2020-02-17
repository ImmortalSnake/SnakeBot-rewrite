import { Event, util } from 'klasa';
import { DMChannel, GuildChannel, TextChannel, MessageEmbed } from 'discord.js';

export default class extends Event {

    public async run(channel: DMChannel | GuildChannel) {
        if (channel instanceof DMChannel) return null;
        const [logChannel] = await channel.guild.settings.resolve('channels.log') as [TextChannel];

        if (!logChannel?.postable || !logChannel.embedable) return null;
        return logChannel.send(new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Channel Created')
            .setDescription(`A ${util.toTitleCase(channel.type)} channel \`${channel.name}\` (${channel.id}) was created${channel.parent ? ` in ${channel.parent.name}` : ''}.`)
            .setTimestamp());
    }

}
