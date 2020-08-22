import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel } from 'discord.js';

export default class extends Event {

    public async run(oldMessage: Message, newMessage: Message) {
        if (!newMessage.guild || newMessage.author.bot || oldMessage.content === newMessage.content || newMessage.deleted) return null;

        const chanID = newMessage.guildSettings.get('channels.log') as string;
        const logChannel = newMessage.guild.channels.cache.get(chanID) as TextChannel;

        if (!logChannel.postable || !logChannel.embedable) return null;
        return logChannel.send(new MessageEmbed()
            .setColor('ORANGE')
            .setTitle(`Message Updated in #${(oldMessage.channel as TextChannel).name}`)
            .setAuthor(`${oldMessage.author.tag} (${oldMessage.author.id})`, oldMessage.author.displayAvatarURL())
            .setDescription(`[See new message](${newMessage.url})\n\n**Old Message:**\n${newMessage.content.slice(0, 2000)}`)
            .setTimestamp());
    }

}
