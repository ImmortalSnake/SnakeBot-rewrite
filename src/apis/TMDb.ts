import fetch from 'node-fetch';
import APIWrapper from '../lib/structures/base/APIWrapper';
import APIWrapperStore from '../lib/structures/base/APIWrapperStore';

export default class TMDBAPI extends APIWrapper {

    public constructor(store: APIWrapperStore, file: string[], directory: string) {
        super(store, file, directory, {
            apiURL: 'https://api.themoviedb.org/3',
            apiKey: process.env.TMDB_KEY as string
        });
    }

    public async searchMovie(query: string) {
        return fetch(this.getURL('search/movie', {
            api_key: this.apiKey,
            query
        }))
            .then(res => res.json())
            .then((body: TMDbSearchMovieResult) => body);
    }

    public async searchTV(query: string, year?: string) {
        return fetch(this.getURL('search/tv', {
            api_key: this.apiKey,
            query,
            first_air_date_year: year
        }))
            .then(res => res.json())
            .then((body: TMDbSearchTVResult) => body);
    }

}

interface TMDbSearchResult {
    page: number;
    total_results: number;
    total_pages: number;
}

interface TMDbSearchMovieResult extends TMDbSearchResult{
    results: TMDbMovieData[];
}

interface TMDbSearchTVResult extends TMDbSearchResult {
    results: TMDbTVData[];
}

interface TMDbMovieData extends TMDbSearchData{
    video: boolean;
    adult: boolean;
    original_title: string;
    title: string;
    release_date: string;
}

interface TMDbTVData extends TMDbSearchData {
    name: string;
    first_air_date: string;
    origin_country: string[];
    original_name: string;
}

interface TMDbSearchData{
    popularity: number;
    vote_count: number;
    poster_path?: string;
    id: number;
    backdrop_path?: string;
    original_language: string;
    genre_ids: number[];
    vote_average: number;
    overview: string;
}
