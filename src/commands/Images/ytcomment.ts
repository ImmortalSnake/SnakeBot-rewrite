import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { readFile } from 'fs-nextra';
import { Canvas } from 'canvas-constructor';
import { assetFolder } from '../../lib/utils/constants';
import { join } from 'path';

export default class extends SnakeCommand {

    public template?: Buffer;
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            usage: '<text:...str{1,90}>',
            examples: ['This is a short youtube comment'],
            requiredPermissions: ['ATTACH_FILES']
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.channel.sendFile(await this.generate(msg.author, text.replace(/\n/g, '')), 'youtube.png');
    }

    public async generate(user: KlasaUser, text: string) {
        const avatar = await user.fetchAvatar(64);
        const time = `${(Math.floor(Math.random() * 59) + 1)} minutes ago`;
        const canvas = new Canvas(650, 183)
            .addImage(this.template!, 0, 0)
            .addCircularImage(avatar, 43, 59, 26)
            .setTextFont('17px RobotoMedium');

        const size = canvas.measureText(user.username);
        return canvas
            .addText(user.username, 92, 50)
            .setTextFont('19px RobotoRegular')
            .addWrappedText(this.wrap(text, 45), 95, 72, 550)
            .setTextFont('17px RobotoRegular')
            .setColor('#808080')
            .addText(time, 100 + size.width, 50)
            .toBufferAsync();
    }

    public async init() {
        this.template = await readFile(join(assetFolder, 'images', 'ytcomment.png'));
    }

    private wrap(string: string, width: number) {
        const regex = new RegExp(`(.{${width}})`, 'g');
        return string.replace(regex, '$1\n');
    }

}
