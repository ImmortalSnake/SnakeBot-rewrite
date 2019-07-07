import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import tictactoe from '../../lib/Games/tictactoe';
import { GuildMember, ClientUser, Message } from 'discord.js';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '[opponent:member]',
            cooldown: 60,
            cooldownLevel: 'channel'
        });
    }

    public async run(msg: KlasaMessage, [opp]: [GuildMember]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (opp && opp.id === (msg.author as KlasaUser).id) return msg.sendMessage('You cant play against yourself');
        if (opp) {
            await msg.channel.send(`${opp.toString()}, Do you confirm to play? (y/n)`);
            const responses = await msg.channel.awaitMessages(m => m.author.id === opp.id, { time: 30000, max: 1 });

            if (responses.size === 0) throw 'Challenge Request Timeout!';
            if ((responses.first() as Message).content.toLowerCase() === 'n') throw 'Challenge was rejected';
        }

        const game = new tictactoe(this.client, opp ? false : true);
        const res = await game.play(msg,
            [(msg.author as KlasaUser).id,
                opp ? (opp as GuildMember).user.id : (this.client.user as ClientUser).id]);

        await msg.channel.send(res);
        return null;
    }
}
