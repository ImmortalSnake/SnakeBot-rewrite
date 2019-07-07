import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import ImageHandler from '../../lib/utils/ImageHandler';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            cooldown: 10,
            usage: '<text:str{1,100}>'
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return new ImageHandler()
            .ytImage(msg, text).then((res) => {
                return msg.send({
                    files: [{
                        attachment: res.body,
                        name: 'youtube.png',
                    }]
                }).catch(() => {
                    throw 'An error Occured! Try again later';
                });
            });
    }
}
