import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import TMDBAPI from '../../apis/TMDb';
import { MessageEmbed } from 'discord.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<query:str> [page:int]',
            usageDelim: '-',
            cooldown: 10,
            examples: ['friends']
        });
    }

    public async run(msg: KlasaMessage, [query, page = 1]: [string, number]): Promise<KlasaMessage | KlasaMessage[]> {
        const data = await (this.client.apis.get('TMDb') as TMDBAPI).searchTV(query);
        const show = data.results[page - 1];

        if (!show) throw `:x: Could not find a tv show with name **${query}** at page ${page}`;

        const embed = new MessageEmbed()
            .setImage(`https://image.tmdb.org/t/p/original${show.poster_path}`)
            .setURL(`https://www.themoviedb.org/tv/${show.id}`)
            .setTitle(`${show.name} - (${page}/${data.results.length}) results`)
            .setDescription(show.overview)
            .setFooter(`${this.client.user!.tag} uses the TMDb API but is not endorsed or certified by TMDb.`,
                'https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png');

        if (show.name !== show.original_name) embed.addField('Original Name', show.original_name, true);
        embed
            .addField('Vote Count', show.vote_count, true)
            .addField('Vote Average', `${show.vote_average} / 10`, true)
            .addField('Popularity', `${show.popularity.toFixed(2)}%`, true)
            .addField('First Aired Date', show.first_air_date, true);

        return msg.sendEmbed(embed);
    }

}
