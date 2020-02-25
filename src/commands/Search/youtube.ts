import { CommandStore, KlasaMessage, Timestamp } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import YoutubeAPI, { YouTubeResultOkItem } from '../../apis/Youtube';

export default class extends SnakeCommand {

    public timestamp = new Timestamp('d MMMM YYYY');

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<query:...str>',
            aliases: ['yt', 'ytsearch'],
            description: lang => lang.get('COMMAND_YOUTUBE_EXTENDED'),
            extendedHelp: lang => lang.get('COMMAND_YOUTUBE_EXTENDED'),
            examples: ['pewdiepie']
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const type = msg.content.split('--')[1]?.toLowerCase().trim();
        const youtube = this.client.apis.get('Youtube') as YoutubeAPI;

        return youtube.search(query, { maxResults: 1, part: 'snippet', type })
            .then(data => {
                if (!data.items || !data.items.length) throw msg.language.get('COMMAND_YOUTUBE_NO_SEARCH');
                const result = data.items[0];

                const embed = new SnakeEmbed(msg)
                    .setColor('RED')
                    .setTitle(result.snippet.title)
                    .setDescription(result.snippet.description)
                    .setThumbnail(result.snippet.thumbnails.default.url)
                    .addField('Channel', result.snippet.channelTitle)
                    .addField('Created At:', new Date(result.snippet.publishedAt).toUTCString())
                    .setFooter('Youtube', 'https://i.imgur.com/kKHJg9Q.png')
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
                return `https://youtube.com/watch?v=${data.id.videoId}`;
            default:
                return '';
        }
    }

}
