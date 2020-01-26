import { CommandStore, KlasaMessage, util } from 'klasa';
import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { ZWS } from '../../lib/utils/constants';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['ud', 'urbandictionary'],
            requiredPermissions: ['EMBED_LINKS'],
            usage: '<query:...string{0,240}>',
            nsfw: true
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const response = await fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`);
        const { list } = await response.json();

        let page = 1;
        if (msg.flags) page = msg.flagArgs.page ? parseInt(msg.flagArgs.page, 10) || 1 : 1;

        const result = list[page - 1];
        if (typeof result === 'undefined') {
            throw page === 1
                ? 'I could not find this entry in UrbanDictionary'
                : 'I could not find this page in UrbanDictionary, try a lower page';
        }

        const definition = this.content(result.definition, result.permalink);

        return msg.sendEmbed(new MessageEmbed()
            .setTitle(`Definition of ${util.toTitleCase(query)} ${page}/${list.length}`)
            .setURL(result.permalink)
            .setColor('AQUA')
            .setThumbnail('http://i.imgur.com/CcIZZsa.png')
            .setDescription(definition)
            .addField('Example', this.cutText(result.example, 750))
            .addField(ZWS, `\\👍 ${result.thumbs_up}`, true)
            .addField(ZWS, `\\👎 ${result.thumbs_down}`, true)
            .setFooter(`${result.author} | © Urban Dictionary`));
    }

    public content(definition: string, permalink: string) {
        if (definition.length < 750) return definition;
        return `${this.cutText(definition, 750)}... [continue reading](${permalink})`;
    }

    public cutText(str: string, length: number) {
        if (str.length < length) return str;
        const cut = this.splitText(str, length - 3);
        if (cut.length < length - 3) return `${cut}...`;
        return `${cut.slice(0, length - 3)}...`;
    }

    public splitText(str: string, length: number, char = ' ') {
        const x = str.substring(0, length).lastIndexOf(char);
        const pos = x === -1 ? length : x;
        return str.substring(0, pos);
    }

}
