import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<message:message>',
            requiredPermissions: ['READ_MESSAGE_HISTORY']
        });
    }

    public async run(msg: KlasaMessage, [message]: [KlasaMessage]) {
        return msg.send(new MessageEmbed()
            .setDescription(`[Jump To](${message.url})\n${message.content}`)
            .setTimestamp(message.createdTimestamp)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(message.member?.displayColor || ''));
    }

}
