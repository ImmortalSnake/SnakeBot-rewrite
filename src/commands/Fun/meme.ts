import { KlasaMessage, CommandStore } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        await this.client.meme.meme(msg.channel.id);
        return null;
    }

}
