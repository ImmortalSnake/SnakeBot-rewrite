import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import fetch from 'node-fetch';
const sources = ['akairo', 'akairo-master', 'commando'];

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<search:...str>',
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        let type = msg.flags ? msg.flags[Object.keys(msg.flags)[0]] : 'master';
        if (!sources.includes(type)) type =  `https://raw.githubusercontent.com/discordjs/discord.js/docs/${type}.json`;

        return fetch(`https://djsdocs.sorta.moe/v2/embed?src=${type}&q=${query}`)
        .then((res) => res.json())
        .then((body) => msg.send({embed: body}))
        .catch(() => msg.send('Could not fetch any search results'));
    }
}
