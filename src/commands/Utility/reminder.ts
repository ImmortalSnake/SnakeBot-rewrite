import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<duration:time> <text:...str>'
        });
    }

    public async run(msg: KlasaMessage, [duration, text]: [any, string]): Promise<KlasaMessage | KlasaMessage[]> {
        await this.client.schedule.create('reminder', duration, {
            data: {
                user: msg.author!.id,
                text
            },
            catchUp: true
        });
        return msg.sendMessage('A Reminder was created!');
    }

}
