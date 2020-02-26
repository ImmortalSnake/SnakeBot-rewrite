import { Argument, KlasaMessage, Possible } from 'klasa';
import SnakeBot from '../lib/client';
import AudioTrack from '../lib/structures/audio/AudioTrack';

export default class extends Argument {

    public async run(arg: string, _: Possible, msg: KlasaMessage) {
        if (!arg) throw ':x: Please specify a song name or provide a valid url';
        if (!msg.guild) return null;

        const remainingEntries = this.getRemainingEntries(msg);
        if (remainingEntries <= 0) throw ':x: You have already reached the maximum number of entries per user';

        const { audio } = this.client as SnakeBot;

        const query = this.getFullArgs(msg, arg);
        const parsedURL = this.parseURL(arg);

        const returnAll = parsedURL?.playlist;
        const soundcloud = 'sc' in msg.flagArgs || 'soundcloud' in msg.flagArgs;

        let tracks: AudioTrack[];

        if (parsedURL) tracks = await audio.fetchSongs(arg);
        else if (soundcloud) tracks = await audio.fetchSongs(`scsearch: ${query}`);
        else tracks = await audio.fetchSongs(`ytsearch: ${query}`);

        if (!tracks.length && !soundcloud) tracks.push(...await audio.fetchSongs(`scsearch: ${query}`));
        tracks = this.filter(msg, tracks).slice(0, remainingEntries);

        if (!tracks.length) throw ':x: Could not get any search results!';
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

    public getRemainingEntries(msg: KlasaMessage) {
        const maxEntries = msg.guildSettings.get('music.maxentries') as number;
        const entries = msg.guild!.audio?.tracks.filter(t => t.requester === msg.author.id).length || 0;

        return maxEntries - entries;
    }

    private getFullArgs(msg: KlasaMessage, arg: string) {
        const { args } = msg;
        const { usageDelim } = msg.command!;

        const index = args.indexOf(arg);
        return args.splice(index, args.length - index).join(usageDelim!);
    }

    private filter(msg: KlasaMessage, tracks: AudioTrack[]) {
        if (msg.member!.isDJ) return tracks;

        const allowStreams = msg.guildSettings.get('music.allowstreams');
        const maxduration = msg.guildSettings.get('music.maxduration') as number;

        return tracks.filter(t => (allowStreams || !t.info.isStream) && t.info.length < maxduration);
    }

}
