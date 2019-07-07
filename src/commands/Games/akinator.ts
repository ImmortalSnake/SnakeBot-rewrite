import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import akinator from '../../lib/Games/akinator';
import { TextChannel } from 'discord.js';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            aliases: ['aki'],
            cooldown: 5
        });
    }

    public async run(msg: KlasaMessage, [title]: [string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        new akinator().play(msg).catch(e => { return msg.send(e); });
        return null;
    }
}
