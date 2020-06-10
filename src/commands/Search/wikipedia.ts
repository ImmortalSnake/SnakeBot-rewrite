import { CommandStore, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<text:...str{0,220}>',
            aliases: ['wiki'],
            examples: ['snakes'],
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage, [text = 'wiki']: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${text}`);
        const body = await res.json();

        const page = msg.flagArgs.page ? parseInt(msg.flagArgs.page, 10) || 1 : 1;
        const data = body.query.pages[page - 1];
        if (!data) throw msg.language.get('COMMAND_WIKIPEDIA_NO_SEARCH');
        if (data.missing) throw `**${text}** was not found in Wikipedia.`;

        return msg.sendEmbed(new MessageEmbed()
            .setColor('#ace9e7')
            .setTitle(`${data.title || text} | Page ${page}/${body.query.pages.length}`)
            .setURL(data.fullurl)
            .setDescription(`${(data.extract.length < 2000 ? data.extract : data.extract.slice(0, 1950))
                .replace(/\n{2,}/g, '\n')
                .replace(/\s{2,}/g, ' ')}... [Read More](${data.fullurl})`)
            .setThumbnail(data.thumbnail ? data.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png')
            .setFooter('Powered by Wikipedia'));
    }

}
