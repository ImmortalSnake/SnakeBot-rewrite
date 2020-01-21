import { KlasaMessage, CommandStore } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<volume:int{1,100}>'
        });
    }

    public async run(msg: KlasaMessage, [volume]: [number]): Promise<KlasaMessage | KlasaMessage[] | null> {

        if (!msg.member!.voice.channel) return msg.send('You need to be in a voice channel');
        this.client.audio.setVolume(msg.guild!, volume);

        return msg.send(`Set the volume to **${volume}**`);
    }

}
