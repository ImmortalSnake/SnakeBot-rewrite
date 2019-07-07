import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import ImageHandler from '../../lib/utils/ImageHandler';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            cooldown: 10,
            aliases: ['triggered'],
            usage: '[user:user]'
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[]> {
        return new ImageHandler()
            .triggerImage(msg, user || msg.author).then((res) => {
                return msg.send({
                    files: [{
                        attachment: res.body,
                        name: 'trigger.png'
                    }]
                }).catch(() => {
                    throw 'An error Occured! Try again later';
                });
            });
    }
}
