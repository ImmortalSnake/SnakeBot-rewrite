import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<duration:time> <text:...str>',
        });
    }

    public async run(msg: KlasaMessage, [duration, text]: [any, string]): Promise<KlasaMessage | KlasaMessage[]> {
        await this.client.schedule.create('reminder', duration, {
            data: {
                user: (msg.author as KlasaUser).id,
                text,
            },
        });
        return msg.sendMessage('A Reminder was created!');
    }
}
