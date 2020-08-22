import { Event, EventStore } from 'klasa';
import { TextChannel, MessageEmbed, Message } from 'discord.js';
import { COLORS } from '../../lib/utils/constants';
import { WSMessageReactionAdd } from '../../lib/utils/types/DiscordAPI';

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, {
            emitter: store.client.ws,
            event: 'MESSAGE_REACTION_REMOVE'
        });
    }

    public async run(data: WSMessageReactionAdd) {
        const channel = this.client.channels.cache.get(data.channel_id) as TextChannel;
        if (!channel || channel.type !== 'text' || !channel.readable) return null;

        const message = await channel.messages.fetch(data.message_id);

        const starboard = await message.guildSettings.get('starboard') as StarboardSettings;
        const starboardChannel = message.guild?.channels.cache.get(starboard.channel!) as TextChannel;

        const count = message.reactions.cache.get(data.emoji.name)?.count;

        if (data.emoji.name !== starboard.emoji
            || !starboardChannel?.postable || !starboardChannel.embedable
            || (channel.nsfw && !starboardChannel.nsfw)) return null;

        const text = `${starboard.emoji} **${count}** in ${channel.toString()} | ${message.id}`;
        const embed = new MessageEmbed()
            .setColor(COLORS.STARBOARD)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp(message.createdTimestamp)
            .setDescription(`[Jump To](${message.url})\n${message.content.slice(0, 2000)}`)
            .setImage(this.getAttachments(message));

        const msg = await this.fetchMessage(message.id, starboard);
        if (msg) {
            if (!count || count < starboard.required) {
                return msg.delete()
                    .then(() => message.guildSettings.update('starboard.messages', `${message.id}-${msg.id}`, { action: 'remove' }));
            }

            return msg.edit(text, embed);
        }
    }

    private async fetchMessage(id: string, starboard: StarboardSettings) {
        const starboardChannel = this.client.channels.cache.get(starboard.channel!) as TextChannel;
        const msg = starboard.messages.find(m => m.startsWith(id));
        const star = msg?.split('-')[1];
        return star ? starboardChannel?.messages.fetch(star) : null;
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
    channel?: string;
    messages: string[];
}
