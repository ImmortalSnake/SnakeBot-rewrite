import { KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        const player = this.client.audio.players.get(msg.guild!.id);
        if (!msg.member!.voice.channel) return msg.send('You need to be in a voice channel');
        if (!player?.current) throw 'I am not playing anything';

        player.player.pause();
        return msg.send(`Paused current playing music`);
    }

}
