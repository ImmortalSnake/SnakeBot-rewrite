/*
import { Command, CommandStore, KlasaMessage, Timestamp } from 'klasa';
import SnakeBot from '../../lib/client';
import Util from '../../lib/utils/Util';

export default class extends Command {
    public timestamp = new Timestamp('d MMMM YYYY');

    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<ytchannel:...str>',
            aliases: ['ytchannel']
        });
    }

    public async run(msg: KlasaMessage, [ytchannel]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendMessage('Loading...')
            .then((m: KlasaMessage[] | KlasaMessage) => {
                const audio = (this.client as SnakeBot).audio;
                return audio.youtube.searchChannels(ytchannel, 1, { part: 'snippet' })
                    .then((data: any[]) => {
                        if (!data[0]) throw 'Could not find any youtube channel with that title';
                        const embed = (this.client as SnakeBot).embed(msg, {
                            description: data[0].raw.snippet.description,
                            title: data[0].raw.snippet.title,
                            color: 'RED'
                        });

                        return audio.youtube.getChannelByID(data[0].id, { part: 'statistics,snippet' })
                            .then((body: any) => {
                                return (m as KlasaMessage).edit(embed
                                    .addField('Video Count', Util.comma(body.videoCount), true)
                                    .addField('Total Views', Util.comma(body.viewCount), true)
                                    .addField('Created At', this.timestamp.display(body.publishedAt), true)
                                    .setThumbnail(body.thumbnails.default.url)
                                    .setURL(`https://www.youtube.com/channel/${body.id}`));
                            });
                    });
            });
    }
}
*/

import { Command } from 'klasa';
export default class extends Command {

    public enabled = false;

}
