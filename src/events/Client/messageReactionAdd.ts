import { Event, EventStore } from 'klasa';
import { TextChannel, MessageEmbed, Message } from 'discord.js';
import { COLORS } from '../../lib/utils/constants';
import { WSMessageReactionAdd } from '../../lib/utils/types/DiscordAPI';

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, {
            emitter: store.client.ws,
            event: 'MESSAGE_REACTION_ADD'
        });
    }

    public async run(data: WSMessageReactionAdd) {
        // return null;
        const channel = this.client.channels.cache.get(data.channel_id) as TextChannel;
        if (!channel || channel.type !== 'text' || !channel.readable) return null;

        const message = await channel.messages.fetch(data.message_id);

        const starboard = await message.guildSettings.get('starboard') as StarboardSettings;
        const { count } = message.reactions.cache.get(data.emoji.name)!;

        if (data.emoji.name !== starboard.emoji
            || count! < starboard.required
            || !starboard.channel?.postable || !starboard.channel?.embedable
            || (channel.nsfw && !starboard.channel?.nsfw)) return null;

        const text = `${starboard.emoji} **${count}** in ${channel.toString()} | ${message.id}`;
        const embed = new MessageEmbed()
            .setColor(COLORS.STARBOARD)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp(message.createdTimestamp)
            .setDescription(`[Jump To](${message.url})\n${message.content.slice(0, 2000)}`)
            .setImage(this.getAttachments(message));

        const msg = await this.fetchMessage(message.id, starboard);
        if (msg) return msg.edit(text, embed);
        return starboard.channel.send(text, embed)
            .then(m => message.guildSettings.update('starboard.messages', `${message.id}-${m.id}`, { action: 'add' }));
    }

    private async fetchMessage(id: string, starboard: StarboardSettings) {
        const msg = starboard.messages.find(m => m.startsWith(id));
        const star = msg?.split('-')[1];
        return star ? starboard.channel?.messages.fetch(star) : null;
    }

    private getAttachments(msg: Message) {
        if (msg.attachments.size) {
            const attachment = msg.attachments.find(att => /\.(bmp|jpe?g|png|gif|webp)$/i.test(att.url));
            if (attachment) return attachment.proxyURL || attachment.url;
        }

        return '';
    }

}

interface StarboardSettings {
    emoji: string;
    required: number;
    channel?: TextChannel;
    messages: string[];
}
