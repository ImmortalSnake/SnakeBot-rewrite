import { Piece } from 'klasa';
import APIWrapperStore from './APIWrapperStore';

export default class APIWrapper extends Piece {

    protected readonly apiURL: string;
    protected readonly apiKey: string | undefined;
    public constructor(store: APIWrapperStore, file: string[], directory: string, options: APIOptions) {
        super(store, file, directory, {
            enabled: options.enabled ?? true
        });

        this.apiURL = options.apiURL;
        this.apiKey = options.apiKey;
    }

    protected getURL(endpoint = '', params = {}): string {
        const urlParams = new URLSearchParams(params).toString();
        const url = new URL(`${this.apiURL}/${endpoint}?${urlParams.toString()}`);

        return url.toString();
    }

}

export interface APIOptions {
    apiURL: string;
    apiKey?: string;
    enabled?: boolean;
}
