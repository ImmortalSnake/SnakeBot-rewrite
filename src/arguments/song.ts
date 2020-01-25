import { Argument, KlasaMessage, Possible } from 'klasa';
import SnakeBot from '../lib/client';
import AudioTrack from '../lib/structures/audio/AudioTrack';

export default class extends Argument {

    public async run(arg: string, _: Possible, message: KlasaMessage) {
        if (!arg) throw 'Please specify a song name or provide a valid url';
        if (!message.guild) return null;
        if (!message.member?.voice.channel) return null;

        const { audio } = this.client as SnakeBot;

        arg = this.getFullArgs(message, arg); // .replace(/^<(.+)>$/g, '$1');
        const parsedURL = this.parseURL(arg);
        console.log(arg, parsedURL);
        let returnAll: boolean;
        let tracks: AudioTrack[];
        let soundcloud = true;
        if (parsedURL) {
            tracks = await audio.fetchSongs(arg);
            returnAll = parsedURL.playlist;
        } else if (('sc' in message.flagArgs) || ('soundcloud' in message.flagArgs)) {
            tracks = await audio.fetchSongs(`scsearch: ${arg}`);
            returnAll = false;
            soundcloud = false;
        } else {
            tracks = await audio.fetchSongs(`ytsearch: ${arg}`);
            returnAll = false;
        }
        if (!tracks.length) {
            if (soundcloud) tracks.push(...await audio.fetchSongs(`scsearch: ${arg}`));
            if (!tracks.length) throw 'Could not get any search results!';
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
