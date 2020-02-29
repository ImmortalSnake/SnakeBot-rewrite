import fetch from 'node-fetch';
import { util } from 'klasa';
import APIWrapper from '../lib/structures/base/APIWrapper';
import APIWrapperStore from '../lib/structures/base/APIWrapperStore';

export default class YoutubeAPI extends APIWrapper {

    public constructor(store: APIWrapperStore, file: string[], directory: string) {
        super(store, file, directory, {
            apiURL: 'https://www.googleapis.com/youtube/v3',
            apiKey: process.env.YOUTUBE_KEY
        });
    }

    public defaultParams(q: string, options: DefaultOptions = {}) {
        return util.mergeDefault({
            q,
            part: 'snippet',
            maxResults: 10,
            key: this.apiKey
        }, options);
    }

    public async search(query: string, options: YoutubeSearchOptions = {}) {
        if (options.type && !['channel', 'video', 'playlist'].includes(options.type.toLowerCase())) throw `Invalid Search Type`;
        return fetch(this.getURL('search', util.mergeDefault(this.defaultParams(query), options)))
            .then(res => res.json())
            .then(body => body as YouTubeResultOk);
    }

    public async searchVideos(query: string, options: Record<string, string> = {}) {
        return fetch(this.getURL('videos', util.mergeDefault(this.defaultParams(query), options)))
            .then(res => res.json());
    }

}

interface DefaultOptions {
    maxResults?: number;
    part?: string;
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
