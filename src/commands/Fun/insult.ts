import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import insults from '../../lib/Data/ts/insults';
import { GuildMember } from 'discord.js';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '[user:member]',
        });
    }

    public async run(msg: KlasaMessage, [member]: [GuildMember]): Promise<KlasaMessage | KlasaMessage[]> {
        const insult = insults[Math.floor(Math.random() * insults.length)];
        return msg.sendMessage(`${member ? `${member.toString()}, ` : ''}${insult}`);
    }
}
