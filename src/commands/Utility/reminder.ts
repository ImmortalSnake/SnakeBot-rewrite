import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import Util from '../../lib/utils/Util';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<duration:time> <text:...str>'
        });
    }

    public async run(msg: KlasaMessage, [duration, text]: [number, string]): Promise<KlasaMessage | KlasaMessage[]> {
        await this.client.schedule.create('reminder', duration, {
            data: {
                user: msg.author!.id,
                text
            },
            catchUp: true
        });

        return msg.sendLocale('COMMAND_REMINDER_CREATE', [Util.msToDuration(duration - Date.now())]);
    }

}
