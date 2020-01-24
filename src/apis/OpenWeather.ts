import fetch from 'node-fetch';
import APIWrapper from '../lib/structures/base/APIWrapper';
import APIWrapperStore from '../lib/structures/base/APIWrapperStore';

export default class WeatherAPI extends APIWrapper {

    public constructor(store: APIWrapperStore, file: string[], directory: string) {
        super(store, file, directory, {
            apiURL: 'https://api.openweathermap.org/data/2.5/',
            apiKey: process.env.WEATHER_KEY as string
        });
    }

    public async fetch(city: string) {
        const url = this.getURL('weather', { q: city, APPID: this.apiKey });
        return fetch(url).then(res => res.json());
    }

}
