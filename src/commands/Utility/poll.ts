import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<title:...str>',
            requiredPermissions: ['ADD_REACTIONS', 'EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage, [title]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const m = await msg.sendEmbed(new SnakeEmbed(msg)
            .setTitle(title)
            .setDescription('React Below!'));

        await m.react('👍');
        await m.react('👎');

        return m;
    }

}
