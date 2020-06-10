import { KlasaMessage, CommandStore } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import fetch from 'node-fetch';
import { MessageAttachment } from 'discord.js';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            requiredPermissions: ['ATTACH_FILES'],
            cooldown: 10
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        return fetch('https://cataas.com/cat')
            .then(res => res.buffer())
            .then(buf => msg.send(new SnakeEmbed(msg)
                .attachFiles([new MessageAttachment(buf, 'cat.png')])
                .setImage('attachment://cat.png')
                .init()))
            .catch(() => msg.sendLocale('NO_SEARCH'));
    }

}
