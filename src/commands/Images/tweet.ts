import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import moment from 'moment';
import { Canvas } from 'canvas-constructor';
import { readFile } from 'fs-nextra';
import { join } from 'path';
import { assetFolder } from '../../lib/utils/constants';
import Util from '../../lib/utils/Util';

export default class extends SnakeCommand {

    public template?: Buffer;
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            usage: '<text:...str{1,200}>',
            examples: ['This is a tweet!'],
            requiredPermissions: ['ATTACH_FILES']
        });
    }

    public async run(msg: KlasaMessage, [text]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.channel.sendFile(await this.generate(msg.author, text), 'tweet.png');
    }

    public async generate(user: KlasaUser, text: string) {
        const image = await user.fetchAvatar(64);
        const time = moment().format('h:m A - D MMM GGGG');
        const [likes, retweet] = [...Array(2)].map(() => Util.comma(Math.floor(Math.random() * 100000) + 1));
        const canvas = new Canvas(955, 488)
            .addImage(this.template!, 0, 0)
            .addBeveledImage(image, 33, 32, 75, 75)
            .setTextFont('30px RobotoMedium')
            .addText(user.username, 125, 65)
            .setTextFont('25px RobotoRegular')
            .setColor('#808080')
            .addText(`@${user.username}`, 125, 95)
            .setTextFont('20px RobotoRegular')
            .addText(time, 32, 470)
            .setTextFont('38px SegoeUIRegular');

        return this.formatText(canvas, text)
            .setColor('#2C5F63')
            .addText(likes, 160, 420)
            .addText(retweet, 34, 420)
            .toBufferAsync();
    }

    public async init() {
        this.template = await readFile(join(assetFolder, 'images', 'tweet.png'));
    }

    private formatText(canvas: Canvas, text: string) {
        let [sizex, sizey] = [35, 160];
        for (let word of text.split(' ')) {
            word += ' ';
            const length = canvas.measureText(word).width;
            if (sizex + length > 920) [sizex, sizey] = [35, sizey + 50];
            if (word.startsWith('@') || word.startsWith('#')) {
                canvas.setColor('#1b95e0')
                    .addText(word, sizex, sizey);
            } else {
                canvas.setColor('#000000')
                    .addText(word, sizex, sizey);
            }

            sizex += length;
        }

        return canvas;
    }

}
