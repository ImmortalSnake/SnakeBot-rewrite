import { KlasaMessage, CommandStore } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<position:timespan>'
        });
    }

    public async run(msg: KlasaMessage, [position]: [number]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const player = this.client.audio.players.get(msg.guild!.id);
        if (!msg.member!.voice.channel) return msg.send('You need to be in a voice channel');
        if (!player?.current) throw 'I am not playing anything';

        player.player.seek(position);

        return msg.send(`Successfully changed the time!`);
    }

}
