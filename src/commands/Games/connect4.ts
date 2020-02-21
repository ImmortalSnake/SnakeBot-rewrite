import { CommandStore, KlasaMessage } from 'klasa';
import connect4 from '../../lib/Games/connect4';
import { GuildMember, Message } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[opponent:member]',
            cooldown: 60,
            cooldownLevel: 'channel',
            description: lang => lang.get('COMMAND_CONNECT4_DESCRIPTION'),
            extendedHelp: lang => lang.get('COMMAND_CONNECT4_EXTENDED')
        });
    }

    public async run(msg: KlasaMessage, [opp]: [GuildMember]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (opp && opp.id === msg.author.id) return msg.sendMessage('You cant play against yourself');
        let players: string[] = [];

        if (opp) {
            players = [msg.author.id, opp.id];
            await msg.channel.send(`${opp.toString()}, Do you confirm to play? (y/n)`);
            const responses = await msg.channel.awaitMessages(m => m.author.id === opp.id, { time: 30000, max: 1 });

            if (responses.size === 0) throw 'Challenge Request Timeout!';
            if ((responses.first() as Message).content.toLowerCase() === 'n') throw 'Challenge was rejected';
        } else {
            const start = await msg.ask('Do you want to start first? (y/n)');

            if (start) players = [msg.author!.id, this.client.user!.id];
            else players = [this.client.user!.id, msg.author!.id];
        }

        await new connect4(msg, players).run();
        // await msg.channel.send(res);
        return null;
    }

}
