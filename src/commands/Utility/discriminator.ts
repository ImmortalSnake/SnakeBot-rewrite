import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            aliases: ['discrim'],
            usage: '<discrim:regex/\\d{4}/>'
        });
    }

    public async run(msg: KlasaMessage, [discriminator]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const users = this.client.users.filter(u => u.discriminator === discriminator).map(u => u.tag);
        return msg.sendMessage(`**Users with the Discriminator: ${discriminator}**\n${users.length > 2000 ? users.slice(0, 1999) : users}`);
    }
}

