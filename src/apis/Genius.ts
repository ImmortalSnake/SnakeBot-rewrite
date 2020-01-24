import fetch from 'node-fetch';
import cheerio from 'cheerio';
import APIWrapper from '../lib/structures/base/APIWrapper';
import APIWrapperStore from '../lib/structures/base/APIWrapperStore';

export default class GeniusAPI extends APIWrapper {

    public constructor(store: APIWrapperStore, file: string[], directory: string) {
        super(store, file, directory, {
            apiURL: 'https://api.genius.com',
            apiKey: process.env.GENIUS_KEY as string
        });
    }

    public async search(q: string) {
        return fetch(this.getURL('search', { q }), {
            headers: { Authorization: `Bearer ${this.apiKey}` }
        }).then(res => res.json());
    }

    public async lyrics(url: string) {
        return fetch(url)
            .then(res => res.text())
            .then(body => cheerio.load(body)('.lyrics')?.text().trim());
    }

}
