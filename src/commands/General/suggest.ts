import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { MessageEmbed } from 'discord.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<suggestion:...string>',
            runIn: ['text', 'dm'],
            examples: ['How about a better suggest command']
        });
    }

    public async run(msg: KlasaMessage, [suggestion]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        await this.client.webhook.send({
            username: msg.author.username,
            avatarURL: msg.author.displayAvatarURL(),
            embeds: [new MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                .setColor(0x5ea832)
                .setTitle('User Suggestion')
                .setDescription(suggestion)
                .setFooter(this.client.user!.tag, this.client.user!.displayAvatarURL())]
        });

        return msg.sendLocale('COMMAND_SUGGESTION_REPLY');
    }

}
