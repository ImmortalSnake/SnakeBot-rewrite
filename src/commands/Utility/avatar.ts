import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[user:user]',
            examples: ['', '@Jeff'],
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[]> {
        if (!user) user = msg.author;
        return msg.send(new SnakeEmbed(msg)
            .setImage(user.displayAvatarURL())
            .setTitle(`**${user.username}**`)
            .init());
    }

}
