import { CommandStore, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
const sources = ['akairo', 'akairo-master', 'commando'];

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<search:...str>',
            examples: ['Guild'],
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage, [query]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        let type = msg.content.split('--')[1]?.toLowerCase().trim() || 'master';
        if (!sources.includes(type)) type = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${type}.json`;

        return fetch(`https://djsdocs.sorta.moe/v2/embed?src=${type}&q=${query}`)
            .then(res => res.json())
            .then(body => msg.send(body.error ? body : { embed: body }))
            .catch(() => { throw 'Could not fetch any search results'; });
    }

}
