import { CommandStore, KlasaMessage, Timestamp } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import fetch from 'node-fetch';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    private readonly timestamp = new Timestamp('MMMM, dddd dd YYYY');
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            requiredPermissions: ['EMBED_LINKS'],
            usage: '[random|number:integer|query:string]',
            cooldown: 10,
            examples: ['', 'random', '5']
        });
    }

    public async run(msg: KlasaMessage, [query]: [(number | string)?]): Promise<KlasaMessage | KlasaMessage[]> {
        const num = await this.comic(query);
        const comic = await fetch(`https://xkcd.com/${num}/info.0.json`).then(res => res.json()) as XKCDResultOk;
        const time = this.timestamp.display(new Date(Number(comic.year), Number(comic.month), Number(comic.day)));

        return msg.send(new SnakeEmbed(msg).init()
            .setTitle(`${comic.num} - ${comic.title}`)
            .setURL(`https://xkcd.com/${comic.num}`)
            .setDescription(comic.alt)
            .setImage(comic.img)
            .setFooter(`XKCD | ${time}`));
    }

    private async comic(query?: string | number | 'random') {
        const current = await fetch('https://xkcd.com/info.0.json').then(res => res.json()) as XKCDResultOk;

        if (!query || query === 'random') query = Math.floor(Math.random() * current.num) + 1;
        if (typeof query === 'number') {
            if (query > current.num) throw ':x: Could not find any results';
            return query;
        }

        const text = await fetch(`https://relevantxkcd.appspot.com/process?action=xkcd&query=${encodeURIComponent(query)}`).then(res => res.text());
        const comics = text.split(' ').slice(2);
        const random = Math.floor(Math.random() * comics.length);
        return parseInt(comics[random].replace(/\n/g, ''), 10);
    }

}

interface XKCDResultOk {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
}
