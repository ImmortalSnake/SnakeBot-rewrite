import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['np'],
            music: ['VOICE_PLAYING']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        const { current, player } = msg.guild!.audio!;

        return msg.send(new SnakeEmbed(msg)
            .setTitle(`Now Playing`)
            .setURL(current!.info.uri)
            .setDescription(`
        [${current!.info.title}](${current!.info.uri})

        \`${current!.playingForBar((player.state as any).position)}\`
        \`${current!.totalDuration((player.state as any).position)}\`

        **Requested By:** ${current!.requester} 
        `));

    }

}
