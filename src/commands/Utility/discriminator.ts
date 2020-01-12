import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['discrim'],
            usage: '[discriminator:regex/\\d{4}/]'
        });
    }

    public async run(msg: KlasaMessage, [discriminator]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        if (!discriminator) discriminator = msg.author.discriminator;

        const users = this.client.users.filter(u => u.discriminator === discriminator).map(u => u.tag).join(' ');
        return msg.sendMessage(`**Users with the Discriminator: ${discriminator}**\n${users.slice(0, 1999)}`);
    }

}

