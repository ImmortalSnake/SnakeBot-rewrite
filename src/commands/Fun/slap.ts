import { CommandStore, KlasaMessage } from 'klasa';
import slaps from '../../lib/Data/ts/slaps';
import { User } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:user>',
            examples: ['', '@Jeff'],
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage, [user]: [User]): Promise<KlasaMessage | KlasaMessage[]> {
        const gif = slaps[Math.floor(Math.random() * slaps.length)];

        return msg.sendEmbed(new SnakeEmbed(msg)
            .setColor('ORANGE')
            .setImage(gif)
            .setLocaleTitle('COMMAND_SLAP_TITLE', msg.author.username, user.username));
    }

}
