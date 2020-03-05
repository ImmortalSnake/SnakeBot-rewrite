import { KlasaMessage, CommandStore } from 'klasa';
import fetch from 'node-fetch';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            requiredPermissions: ['ATTACH_FILES'],
            cooldown: 10
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        return fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    return msg.send(new SnakeEmbed(msg)
                        .setImage(data.message)
                        .init());
                }
                return msg.send('Sorry! could not find an image');
            });
    }

}
