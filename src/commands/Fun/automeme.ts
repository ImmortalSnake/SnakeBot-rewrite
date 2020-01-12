import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[minutes:int{15,}]',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 6
        });
    }

    public async run(msg: KlasaMessage, [minutes]: [number]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const automeme = msg.guild!.settings.get('automeme') as any;

        if (automeme.enabled) {
            await msg.guild!.settings.update('automeme.enabled', false);
            return msg.send('Disabled Automemes for the server!');
        }

        if (!minutes) return msg.sendMessage('Enter number of minutes');
        await msg.guild!.settings.update('automeme.enabled', true);
        await msg.guild!.settings.update('automeme.limit', minutes);
        await msg.guild!.settings.update('automeme.channel', msg.channel.id);
        await this.client.schedule.create('automeme', minutes * 60 * 1000, {
            data: { channel: msg.channel.id }
        });

        return msg.send('Automemes have been enabled');
    }

}
