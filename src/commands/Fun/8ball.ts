import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<question:...str>',
            examples: ['am i gay']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const replies = msg.language.get('COMMAND_8BALL_RESPONSES');
        return msg.sendMessage(`🎱**${replies[Math.floor(Math.random() * replies.length)]}**🎱`);
    }

}
