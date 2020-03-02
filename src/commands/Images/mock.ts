import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { readFile } from 'fs-nextra';
import { join } from 'path';
import { assetFolder } from '../../lib/utils/constants';
import { Canvas } from 'canvas-constructor';

export default class extends SnakeCommand {

    public template?: Buffer;
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            usage: '<text:...string{1,30}>',
            examples: ['memes are bad']
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const mocked = text.split('').map(ch => Math.random() > 0.35 ? ch : ch.toUpperCase()).join('');

        return msg.channel.sendFile(await this.generate(mocked), 'mock.png');
    }

    public async generate(text: string) {
        return new Canvas(550, 352)
            .addImage(this.template!, 0, 0)
            .setTextFont('40px RobotoMedium')
            .setColor('#ffffff')
            .setTextAlign('center')
            .addMultilineText(text, 275, 320)
            .toBufferAsync();
    }

    public async init() {
        this.template = await readFile(join(assetFolder, 'images', 'mock.png'));
    }

}
