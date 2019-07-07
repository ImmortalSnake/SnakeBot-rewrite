import { KlasaUser, KlasaMessage, Timestamp } from 'klasa';
import { MessageEmbed, ClientUser, ColorResolvable } from 'discord.js';

interface EmbedOptions {
    description?: string;
    color?: ColorResolvable;
    image?: string;
    url?: string;
    title?: string;
    thumbnail?: string;
    timestamp?: boolean;
}

export default function(msg: KlasaMessage, { description, color = '0xFF0000', image, url, title, thumbnail, timestamp = false }: EmbedOptions): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed()
    .setAuthor((msg.client.user as ClientUser).username, (msg.client.user as ClientUser).displayAvatarURL())
    .setColor(color)
    .setFooter((msg.author as KlasaUser).username, (msg.author as KlasaUser).displayAvatarURL());

    if (description) embed.setDescription(description);
    if (image) embed.setImage(image);
    if (url) embed.setURL(url);
    if (title) embed.setTitle(title);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (timestamp) embed.setTimestamp();

    return embed;
}
