import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['np'],
            music: ['VOICE_PLAYING'],
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        const { current } = msg.guild!.audio;
        const { state } = msg.guild!.audio.player!;

        return msg.send(new SnakeEmbed(msg)
            .setTitle(`Now Playing`)
            .setURL(current!.info.uri)
            .setDescription(`
        [${current!.info.title}](${current!.info.uri})

        \`${current!.playingForBar(state.position)}\`
        \`${current!.totalDuration(state.position)}\`

        **Requested By:** ${current!.requester} 
        `));

    }

}
