import { CommandStore, KlasaMessage } from 'klasa';
import tictactoe from '../../lib/Games/tictactoe';
import { GuildMember } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[opponent:member]',
            cooldown: 60,
            cooldownLevel: 'channel',
            description: lang => lang.get('COMMAND_TICTACTOE_DESCRIPTION'),
            extendedHelp: lang => lang.get('COMMAND_TICTACOE_EXTENDED'),
            examples: ['', '@Jeff']
        });
    }

    public async run(msg: KlasaMessage, [opp]: [GuildMember]): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (opp && opp.id === msg.author.id) return msg.sendMessage('You cant play against yourself');
        if (opp) {
            await msg.channel.send(`${opp.toString()}, Do you confirm to play? (y/n)`);
            const responses = await msg.channel.awaitMessages(m => m.author.id === opp.id, { time: 30000, max: 1 });

            if (responses.size === 0) throw 'Challenge Request Timeout!';
            if (responses.first()!.content.toLowerCase() === 'n') throw msg.language.get('CHALLENGE_REJECTED');
        }

        const game = new tictactoe(this.client, opp ? false : true);
        const res = await game.play(msg,
            [msg.author.id,
                opp ? opp.user.id : this.client.user!.id]);

        await msg.channel.send(res);
        return null;
    }

}
