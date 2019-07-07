import { Command, CommandStore, KlasaMessage, KlasaUser, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<reason:...str>',
            requiredPermissions: ['MANAGE_NICKNAMES', 'MANAGE_MESSAGES'],
            cooldown: 10
        });
    }

    public async run(msg: KlasaMessage, [reason]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        (msg.guild as KlasaGuild).settings.update('afkusers', {
            id: (msg.author as KlasaUser).id,
            reason
        });

        return msg.sendMessage(`${(msg.author as KlasaUser).toString()} has  been set to AFK for reason: **${reason}**`);
    }
}
