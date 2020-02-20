import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { readFile } from 'fs-nextra';
import { join } from 'path';
import { assetFolder } from '../../lib/utils/constants';
import { Canvas } from 'canvas-constructor';
import Util from '../../lib/utils/Util';

export default class extends SnakeCommand {

    public template?: Buffer;
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            usage: '[user:user]'
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[]> {
        const image = await Util.getImage(msg, { user });
        return msg.channel.sendFile(await this.generate(image), 'wanted.png');
    }

    public async generate(image: Buffer) {
        return new Canvas(500, 653)
            .addImage(this.template!, 0, 0)
            .addBeveledImage(image, 95, 186, 310, 310)
            .toBufferAsync();
    }

    public async init() {
        this.template = await readFile(join(assetFolder, 'images', 'wanted.png'));
    }

}
