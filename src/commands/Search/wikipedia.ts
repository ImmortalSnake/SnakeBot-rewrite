import { Command, CommandStore, KlasaMessage, KlasaUser, Timestamp } from 'klasa';
import SnakeBot from '../../lib/client';
import fetch from 'node-fetch';
import { GuildMember, MessageEmbed } from 'discord.js';

export default class extends Command {

    constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<text:...str{0,220}>',
            aliases: ['wiki']
        });
    }

    public async run(msg: KlasaMessage, [text = 'wiki']: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${text}`);
        const body = await res.json();

        let page = 1;
        if (msg.flags) page = this.getFlags(msg) ? parseInt((this.getFlags(msg) as string).slice(4)) || 1 : 1;
        const data = body.query.pages[page - 1];
        if (!data) throw `Could not find this page in wikipedia. Try a lower page`;
        if (data.missing ) throw `**${text}** was not found in Wikipedia.`;

        console.log(data);
        return msg.sendEmbed(new MessageEmbed()
            .setColor('#ace9e7')
            .setTitle(`${data.title || text} | Page: ${page}`)
            .setURL(data.fullurl)
            .setFooter('Powered by Wikipedia')
            .setDescription(`${data.extract.length < 2000 ? data.extract : data.extract.slice(0, 1950)}... [Read More](${data.fullurl})`)
            .setThumbnail(data.thumbnail ? data.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png'));
    }

    public getFlags(msg: KlasaMessage) {
        return Object.keys(msg.flags).find(f => f.toLowerCase().startsWith('page'));
    }
}
