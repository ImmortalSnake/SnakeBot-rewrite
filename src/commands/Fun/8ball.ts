import { CommandStore, KlasaMessage } from 'klasa';
import replies from '../../lib/Data/ts/8ball';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<question:...str>',
            examples: ['am i gay']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendMessage(`🎱**${replies[Math.floor(Math.random() * replies.length)]}**🎱`);
    }

}
