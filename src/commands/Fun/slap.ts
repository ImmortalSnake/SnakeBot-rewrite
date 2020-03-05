import { CommandStore, KlasaMessage } from 'klasa';
import slaps from '../../lib/Data/ts/slaps';
import { MessageEmbed, User } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:user>',
            examples: ['', '@Jeff']
        });
    }

    public async run(msg: KlasaMessage, [user]: [User]): Promise<KlasaMessage | KlasaMessage[]> {
        const gif = slaps[Math.floor(Math.random() * slaps.length)];

        return msg.sendEmbed(new MessageEmbed()
            .setColor('ORANGE')
            .setImage(gif)
            .setLocaleTitle('COMMAND_SLAP_TITLE', [msg.author.username, user.username]));
    }

}
