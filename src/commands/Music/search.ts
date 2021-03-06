import { KlasaMessage, CommandStore, Command } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            music: ['SAME_VC'],
            usage: '<query:...string>',
            examples: ['sunflower'],
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const searchType = 'sc' in msg.flagArgs || 'soundcloud' in msg.flagArgs ? `scsearch` : `ytsearch`;
        const data = await this.client.audio.fetchSongs(`${searchType}: ${query}`);

        const mess = await msg.prompt('**Select a video (1 to 10)**', {
            filter: m => Boolean(Number(m)),
            embed: new SnakeEmbed(msg)
                .setTitle(`Search Results - ${query}`)
                .setDescription(data.slice(0, 10).map((vid, i) => `**[${i + 1}]** [${vid.info.title}](${vid.info.uri})`).join('\n'))
        });

        const video = data[Number(mess.content) - 1];
        if (!video) throw 'Invalid video id';

        return (this.store.get('play') as Command).run(msg, [[video]]);
    }

}
