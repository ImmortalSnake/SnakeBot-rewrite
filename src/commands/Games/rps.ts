import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

const rps = ['rock', 'paper', 'scissors'];
const alias: Record<string, string> = {
    r: 'rock',
    p: 'paper',
    s: 'scissors'
};

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['rockpaperscissors'],
            usage: '<rock|r|paper|p|scissors|s>',
            examples: ['rock', 'p'],
            cooldown: 5
        });
    }

    public async run(msg: KlasaMessage, [player]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const pchoice = rps.indexOf(alias[player] || player);
        const comp = Math.floor(Math.random() * rps.length);
        return msg.channel.send(`**${rps[comp]}**`)
            .then(() => {
                if (comp === pchoice) return msg.send('Its a tie!');
                else if ((comp + 1) % 3 === pchoice) return msg.send('You won!');
                return msg.send('Sorry, you lost!');
            });
    }

}
