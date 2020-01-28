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
            examples: ['endgame', 'joker -2']
        });
    }

    public async run(msg: KlasaMessage, [query, page = 1]: [string, number]): Promise<KlasaMessage | KlasaMessage[]> {
        const data = await (this.client.apis.get('TMDb') as TMDBAPI).searchMovie(query);
        const movie = data.results[page - 1];

        if (!movie) throw `:x: Could not find a movie with title **${query}** at page ${page}`;
        const embed = new MessageEmbed()
            .setImage(`https://image.tmdb.org/t/p/original${movie.poster_path}`)
            .setURL(`https://www.themoviedb.org/movie/${movie.id}`)
            .setTitle(`${movie.title} - (${page}/${data.results.length}) results`)
            .setDescription(movie.overview)
            .setFooter(`${this.client.user!.tag} uses the TMDb API but is not endorsed or certified by TMDb.`,
                'https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png');

        if (movie.title !== movie.original_title) embed.addField('Original Title', movie.original_title, true);
        embed
            .addField('Vote Count', movie.vote_count, true)
            .addField('Vote Average', `${movie.vote_average} / 10`, true)
            .addField('Popularity', `${movie.popularity.toFixed(2)}%`, true)
            .addField('Adult Content', movie.adult ? 'Yep' : 'Nope', true)
            .addField('Release Date', movie.release_date, true);

        return msg.sendEmbed(embed);
    }

}
