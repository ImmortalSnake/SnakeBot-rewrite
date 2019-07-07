import { Command, CommandStore, KlasaMessage, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '[minutes:int{15,}]',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 6
        });
    }

    public async run(msg: KlasaMessage, [minutes]: [number]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const automeme = (msg.guild as KlasaGuild).settings.get('automeme');

        if (automeme.enabled) {
            await (msg.guild as KlasaGuild).settings.update('automeme.enabled', false);
            return msg.send('Disabled Automemes for the server!');
        }

        if (!minutes) return msg.sendMessage('Enter number of minutes');
        await (msg.guild as KlasaGuild).settings.update([]);
        this.client.schedule.create('automeme', minutes * 60 * 1000, {
            data: { channel: msg.channel.id }
        });
    }
}
