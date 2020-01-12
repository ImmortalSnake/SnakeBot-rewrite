import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import ImageHandler from '../../lib/utils/ImageHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            usage: '[user:user]'
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[]> {
        await msg.channel.startTyping();
        return new ImageHandler()
            .magikImage(msg, user || msg.author).then(async res => {
                await msg.channel.stopTyping();
                return msg.send({
                    files: [{
                        attachment: res.body,
                        name: 'magik.png'
                    }]
                }).catch(() => {
                    throw 'An error Occured! Try again later';
                });
            });
    }

}
