import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel } from 'discord.js';

export default class extends Event {

    public async run(oldMessage: Message, newMessage: Message) {
        if (!oldMessage.guild || oldMessage.author.bot || oldMessage.content === newMessage.content) return null;
        const logChannel = await oldMessage.guildSettings.get('channels.log') as TextChannel;

        if (!logChannel.postable || !logChannel.embedable) return null;
        return logChannel.send(new MessageEmbed()
            .setColor('ORANGE')
            .setTitle(`Message Updated in #${(oldMessage.channel as TextChannel).name}`)
            .setAuthor(`${oldMessage.author.tag} (${oldMessage.author.id})`, oldMessage.author.displayAvatarURL())
            .setDescription(`[See new message](${newMessage.url})\n\n**Old Message:**\n${newMessage.content.slice(0, 2000)}`)
            .setTimestamp());
    }

}
