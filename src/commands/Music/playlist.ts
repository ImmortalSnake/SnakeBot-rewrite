import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';
import AudioTrack from '../../lib/structures/audio/AudioTrack';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<add|load|view:default> (song:song)',
            subcommands: true,
            examples: ['', '50']
        });
    }

    public async view(msg: KlasaMessage) {
        const tracks = await msg.author.settings.get('playlist');
        console.log(tracks);
    }

    public async add(msg: KlasaMessage, [tracks]: [AudioTrack[]]) {
        const loaded = tracks.map(x => x.info.uri);
        await msg.author.settings.update('playlist', loaded, { action: 'add' });

        return msg.send(`Added ${loaded.length === 1 ? `**${loaded[0]}**` : `**${loaded.length}** songs`} to your playlist!`);
    }

}
