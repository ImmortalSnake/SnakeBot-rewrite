import { Argument, KlasaMessage, Possible } from 'klasa';
import SnakeBot from '../lib/client';
import AudioTrack from '../lib/structures/audio/AudioTrack';

export default class extends Argument {

    public async run(arg: string, _: Possible, message: KlasaMessage) {
        if (!arg) throw ':x: Please specify a song name or provide a valid url';
        if (!message.guild) return null;

        const { audio } = this.client as SnakeBot;

        const query = this.getFullArgs(message, arg);
        const parsedURL = this.parseURL(arg);

        const returnAll = parsedURL?.playlist;
        const soundcloud = 'sc' in message.flagArgs || 'soundcloud' in message.flagArgs;

        let tracks: AudioTrack[];

        if (parsedURL) tracks = await audio.fetchSongs(arg);
        else if (soundcloud) tracks = await audio.fetchSongs(`scsearch: ${query}`);
        else tracks = await audio.fetchSongs(`ytsearch: ${query}`);

        if (!tracks.length) {
            if (!soundcloud) tracks.push(...await audio.fetchSongs(`scsearch: ${query}`));
            if (!tracks.length) throw ':x: Could not get any search results!';
        }

        return returnAll ? tracks : [tracks[0]];
    }

    public parseURL(url: string): { url: string; playlist: boolean } | null {
        try {
            const parsed = new URL(url);
            return parsed.protocol && parsed.hostname && (parsed.protocol === 'https:' || parsed.protocol === 'http:')
                ? { url: parsed.href, playlist: parsed.searchParams.has('list') }
                : null;
        } catch (error) {
            return null;
        }
    }

    private getFullArgs(message: KlasaMessage, arg: string) {
        const { args } = message;
        const { usageDelim } = message.command!;

        const index = args.indexOf(arg);
        return args.splice(index, args.length - index).join(usageDelim!);
    }

}
