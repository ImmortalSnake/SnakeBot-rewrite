import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { Canvas } from 'canvas-constructor';
import { readFile } from 'fs-nextra';
import { join } from 'path';
import { assetFolder } from '../../lib/utils/constants';
import Util from '../../lib/utils/Util';
import { TextChannel } from 'discord.js';

export default class extends SnakeCommand {

    public template?: Buffer;
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            usage: '[user:user]',
            examples: ['', '@Jeff'],
            requiredPermissions: ['ATTACH_FILES']
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[]> {
        const image = await Util.getImage(msg, { user });
        return (msg.channel as TextChannel).sendFile(await this.generate(image), 'hitler.png');
    }

    public async generate(image: Buffer) {
        return new Canvas(480, 360)
            .addImage(this.template!, 0, 0)
            .addBeveledImage(image, 45, 35, 140, 160)
            .toBufferAsync();
    }

    public async init() {
        this.template = await readFile(join(assetFolder, 'images', 'hitler.png'));
    }

}
