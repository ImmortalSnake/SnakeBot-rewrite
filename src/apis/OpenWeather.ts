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
        return fetch(url)
            .then(res => res.json())
            .then(body => body as WeatherResultOK);
    }

}

export interface WeatherResultOK {
    coord?: {
        lon: number;
        lat: number;
    };
    weather?: WeatherData[];
    base?: string;
    main?: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind?: {
        speed: number;
        deg: number;
    };
    clouds?: {
        all: number;
    };
    rain?: FallData;
    snow?: FallData;
    dt?: number;
    sys?: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone?: number;
    id?: number;
    name?: string;
    cod: number;
    message?: string;
}

export interface WeatherData {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface FallData {
    '1h': number;
    '3h': number;
}
