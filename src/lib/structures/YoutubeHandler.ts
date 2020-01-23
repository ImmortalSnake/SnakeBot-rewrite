import fetch from 'node-fetch';
import { util } from 'klasa';

export default class {

    public readonly apikey: string;
    private readonly apiURL = 'https://www.googleapis.com/youtube/v3/';
    public constructor(apikey: string) {
        this.apikey = apikey;
    }

    public async search(query: string, options: YoutubeSearchOptions = {}) {
        if (options.type && !['channel', 'video', 'playlist'].includes(options.type.toLowerCase())) throw `Invalid Search Type`;
        return fetch(this.getURL('search', util.mergeDefault({
            q: query,
            part: 'snippet',
            maxResults: 10
        }, options)))
            .then(res => res.json())
            .then(body => body as YouTubeResultOk);
    }

    public async searchVideos(query: string, options: Record<string, string> = {}) {
        return fetch(this.getURL('videos', util.mergeDefault({
            q: query,
            part: 'snippet',
            maxResults: 10
        }, options)))
            .then(res => res.json())
            .then(body => body);
    }

    private getURL(type = '', object = {}): string {
        const url = new URL(`${this.apiURL}${type}`);

        url.searchParams.append('key', this.apikey);
        for (const [key, val] of Object.entries(object)) {
            url.searchParams.append(key, val as string);
        }

        return url.toString();
    }

}

export interface YoutubeSearchOptions {
    maxResults?: number;
    type?: string;
    part?: string;
    safeSearch?: string;
}

export interface YouTubeResultOk {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: YouTubeResultOkPageInfo;
    items: YouTubeResultOkItem[];
}

export interface YouTubeResultOkItem {
    kind: string;
    etag: string;
    id: YouTubeResultOkID;
    snippet: YouTubeResultOkSnippet;
}

export interface YouTubeResultOkID {
    kind: string;
    playlistId?: string;
    channelId?: string;
    videoId?: string;
}

export interface YouTubeResultOkSnippet {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YouTubeResultOkThumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
}

export interface YouTubeResultOkThumbnails {
    default: YouTubeResultOkThumbnail;
    medium: YouTubeResultOkThumbnail;
    high: YouTubeResultOkThumbnail;
}

export interface YouTubeResultOkThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface YouTubeResultOkPageInfo {
    totalResults: number;
    resultsPerPage: number;
}
