import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel } from 'discord.js';

export default class extends Event {

    public async run(message: Message) {
        if (!message.guild || message.author.bot) return null;
        const [logChannel] = await message.guildSettings.resolve('channels.log') as [TextChannel];

        if (!logChannel.postable || !logChannel.embedable) return null;
        return logChannel.send(new MessageEmbed()
            .setColor('RED')
            .setTitle(`Message Deleted in #${(message.channel as TextChannel).name}`)
            .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setDescription(message.content.slice(0, 2000))
            .setImage(this.getAttachments(message))
            .setTimestamp());
    }

    private getAttachments(msg: Message) {
        if (msg.attachments.size) {
            const attachment = msg.attachments.find(att => /\.(bmp|jpe?g|png|gif|webp)$/i.test(att.url));
            if (attachment) return attachment.proxyURL || attachment.url;
        }

        return '';
    }

}
