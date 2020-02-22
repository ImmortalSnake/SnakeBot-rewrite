import { CommandStore, KlasaMessage } from 'klasa';
import insults from '../../lib/Data/ts/insults';
import { GuildMember } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[user:member]',
            examples: ['', '@Jeff']
        });
    }

    public async run(msg: KlasaMessage, [member]: [GuildMember]): Promise<KlasaMessage | KlasaMessage[]> {
        const insult = insults[Math.floor(Math.random() * insults.length)];
        return msg.send(`${member ? `${member.toString()}, ` : ''}${insult}`);
    }

}
