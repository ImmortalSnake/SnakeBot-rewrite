import { CommandStore, KlasaMessage, Timestamp } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import { YouTubeResultOkItem } from '../../lib/structures/YoutubeHandler';

export default class extends SnakeCommand {

    public timestamp = new Timestamp('d MMMM YYYY');

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<ytchannel:...str>',
            aliases: ['yt', 'ytsearch']
        });
    }

    public async run(msg: KlasaMessage, [ytchannel]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const type = msg.content.split('--')[1]?.toLowerCase().trim();

        return this.client.audio.youtube.search(ytchannel, { maxResults: 1, part: 'snippet', type })
            .then(data => {
                if (!data.items || !data.items.length) throw 'Could not find any youtube channel with that title';
                const result = data.items[0];

                const embed = new SnakeEmbed(msg)
                    .setColor('RED')
                    .setTitle(result.snippet.title)
                    .setDescription(result.snippet.description)
                    .setThumbnail(result.snippet.thumbnails.default.url)
                    .addField('Channel', result.snippet.channelTitle)
                    .addField('Created At:', new Date(result.snippet.publishedAt).toUTCString())
                    .setURL(this.getLink(result));
                return msg.send(embed);
            });
    }

    private getLink(data: YouTubeResultOkItem) {
        switch (data.id.kind) {
            case 'youtube#channel':
                return `https://youtube.com/channel/${data.id.channelId}`;
            case 'youtube#playlist':
                return `https://youtube.com/channel/${data.id.playlistId}`;
            case 'youtube#video':
                return `https://youtube.com/${data.id.videoId}`;
            default:
                throw `Unknown Result! Please try again later`;
        }
    }

}
