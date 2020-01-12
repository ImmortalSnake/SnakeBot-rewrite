import { CommandStore, KlasaMessage } from 'klasa';
import ImageHandler from '../../lib/utils/ImageHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            usage: '<text:str{1,100}>'
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return new ImageHandler()
            .ytImage(msg, text).then(res => msg.send({
                files: [{
                    attachment: res.body,
                    name: 'youtube.png'
                }]
            }).catch(() => {
                throw 'An error Occured! Try again later';
            }));
    }

}
