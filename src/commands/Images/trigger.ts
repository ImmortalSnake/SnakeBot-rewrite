import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import ImageHandler from '../../lib/utils/ImageHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            aliases: ['triggered'],
            usage: '[user:user]'
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[]> {
        return new ImageHandler()
            .triggerImage(msg, user || msg.author).then(res => msg.send({
                files: [{
                    attachment: res.body,
                    name: 'trigger.png'
                }]
            }).catch(() => {
                throw 'An error Occured! Try again later';
            }));
    }

}
