import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import connect4 from '../../lib/Games/connect4';
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
        // if (opp && opp.id === (msg.author as KlasaUser).id) return msg.sendMessage('You cant play against yourself');
        let players = [] as string[];

        if (opp) {
            players = [(msg.author as KlasaUser).id, opp.id];
            await msg.channel.send(`${opp.toString()}, Do you confirm to play? (y/n)`);
            const responses = await msg.channel.awaitMessages(m => m.author.id === opp.id, { time: 30000, max: 1 });

            if (responses.size === 0) throw 'Challenge Request Timeout!';
            if ((responses.first() as Message).content.toLowerCase() === 'n') throw 'Challenge was rejected';
        } else {
            let start = await msg.prompt('Do you want to start first? (y/n)')
            .then(m => m.content.toLowerCase())
            .catch();

            if (start === 'y') players = [(msg.author as KlasaUser).id, (this.client.user as ClientUser).id];
            else players = [(this.client.user as ClientUser).id, (msg.author as KlasaUser).id];
        }

        const game = new connect4(this.client as SnakeBot, msg, players);
        const res = await game.run(msg);

        // await msg.channel.send(res);
        return null;
    }
}
