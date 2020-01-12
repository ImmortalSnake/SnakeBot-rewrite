import { KlasaMessage } from 'klasa';
import { MessageEmbed, ClientUser, User, Message, TextChannel, Guild } from 'discord.js';
const ms = require('ms');

interface LogHandlerOptions {
    id: number;
    reason: string;
    user: string;
    time: number;
    type: string;
    moderator: string;
    duration?: number;
}

export default async function(msg: KlasaMessage, { id, reason, user, type, moderator, duration }: LogHandlerOptions): Promise<Message | Message[]> {
    const chan = (msg.guild as Guild).channels.get(msg.guildSettings.get('channels.log') as string) || msg.channel;
    const _user = msg.client.users.get(user) as User;
    const mod = msg.client.users.get(moderator) as User;
    const logEmbed = new MessageEmbed()
        .setAuthor((msg.client.user as ClientUser).tag, (msg.client.user as ClientUser).displayAvatarURL())
        .setTitle(`${type}: Case #${id}`)
        .setColor('0xFF0000')
        .addField('Moderator', mod.toString(), true)
        .setDescription(`Reason: \`${reason}\``)
        .addField('Punished User', _user.toString(), true)
        .setFooter('At: ')
        .setTimestamp();

    if (duration) logEmbed.addField('Duration', ms(duration, { 'long': true }), true);
    return (chan as TextChannel).send(logEmbed);
}
