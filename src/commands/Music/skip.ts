import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            music: ['SAME_VC', 'VOICE_PLAYING']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        const audio = msg.guild!.audio!;

        if (!audio.current?.skippers.includes(msg.author!.id)) {
            const reqVotes = Math.ceil((msg.guild!.me!.voice.channel!.members.size - 1) / 2) - audio.current!.skippers.length;
            if (msg.member!.isDJ || reqVotes === 0) {
                audio.player.stop();
                return msg.send(`✅ Your skip has been Acknowledged. Skipping Now ⏭️`);
            }

            audio.current?.skippers.push(msg.author!.id);
            return msg.send(`✅ Your skip has been Acknowledged. You need **${reqVotes - 1}** more votes to skip!`);
        }

        return msg.send(`❌ You already voted to skip!`);
    }

}
