import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<suggestion:...string>',
            examples: ['How about a better suggest command']
        });
    }

    public async run(msg: KlasaMessage, [suggestion]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        await this.client.webhook.send({
            username: msg.author.username,
            avatarURL: msg.author.displayAvatarURL(),
            embeds: [new SnakeEmbed(msg)
                .setDescription(suggestion)
                .setTitle('User Suggestion')
                .init()]
        });

        return msg.sendLocale('COMMAND_SUGGESTION_REPLY');
    }

}
