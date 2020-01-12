import { CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import { Track } from 'shoukaku';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
// import AudioEmbed from '../../lib/structures/audio/embed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<query:...str{0,250}>'
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const { audio } = this.client as SnakeBot;
        const source = msg.flagArgs.source ? msg.flagArgs.source.toLowerCase() : undefined;

        if (source && !['soundcloud', 'youtube'].includes(source)) throw 'Please enter a valid source (youtube|soundcloud)';
        if (!msg.member!.voice.channel) return msg.send('You need to be in a voice channel!');
        // if (this.client.voice && msg.member!.voice.channel.id !== this.client.voice.)

        const tracks = await audio.play(msg, query, source as 'youtube' | 'soundcloud' | undefined);

        console.log(tracks);
        return msg.send(Array.isArray(tracks) ? `Successfully loaded playlist \`${(tracks as any).name}\`` : `Successfully loaded track: \`${(tracks as Track).info.title}\``); // msg.sendMessage(new AudioEmbed(this.client, video[0]));
    }

}
