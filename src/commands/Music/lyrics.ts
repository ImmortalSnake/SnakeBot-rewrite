import { CommandStore, KlasaMessage, RichDisplay } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import GeniusAPI from '../../apis/Genius';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import { MessageEmbed } from 'discord.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<query:...string>',
            cooldown: 10,
            examples: ['happy now']
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const genius = this.client.apis.get('Genius') as GeniusAPI;
        const res = await msg.send(`:mag: **Searching lyrics for** \`${query}\``);

        return genius.search(query)
            .then(async body => {
                if (body.meta.status !== 200 || !body.response.hits.length) throw ':x: Sorry! Could not get any results';
                const data = body.response.hits[0];
                const embed = new SnakeEmbed(msg)
                    .setTitle(data.result.full_title)
                    .setURL(data.result.url)
                    .setThumbnail(data.result.song_art_image_url);

                return genius.lyrics(data.result.url)
                    .then(async lyrics => {
                        const display = new RichDisplay(embed
                            .setDescription(`**${lyrics.slice(0, 2044)}**`));
                        display.addPage((embed: MessageEmbed) => embed);

                        for (let i = 2044; i < lyrics.length; i += 2044) {
                            display.addPage(new SnakeEmbed(msg)
                                .setDescription(`**${lyrics.slice(i, i + 2044)}**`));
                        }

                        await display.run(res);
                        return res;
                    });
            });
    }

}
