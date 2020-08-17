import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            music: ['SAME_VC', 'VOICE_PLAYING'],
            usage: '[force]'
        });
    }

    public async run(msg: KlasaMessage, [force = false]: [boolean]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const { audio } = msg.guild!;
        if (force && !msg.member?.isDJ()) throw 'Only DJ members and admins can force skip!';

        if (!audio.current?.skippers.includes(msg.author!.id)) {
            const reqVotes = Math.ceil((msg.guild!.me!.voice.channel!.members.size - 1) / 2) - audio.current!.skippers.length;
            if ((force && msg.member!.isDJ()) || reqVotes === 1) {
                await audio.player!.stop();
                return msg.sendLocale('COMMAND_SKIP_SUCCESS');
            }

            audio.current?.skippers.push(msg.author!.id);
            return msg.sendLocale('COMMAND_SKIP_ACKNOWLEDGED', [reqVotes - 1]);
        }

        return msg.sendLocale('COMMAND_SKIP_DOUBLE');
    }

}
