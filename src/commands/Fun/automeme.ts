import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<minutes:int{15,}>',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 6,
            examples: ['20']
        });
    }

    public async run(msg: KlasaMessage, [minutes]: [number]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const automeme = msg.guildSettings.get('automeme') as any;

        if (automeme.channel) {
            await msg.guildSettings.reset('automeme.channel');
            return msg.sendLocale('COMMAND_AUTOMEME_DISABLED');
        }

        await msg.guildSettings.update([
            ['automeme.limit', minutes],
            ['automeme.channel', msg.channel.id]
        ]);

        await this.client.schedule.create('automeme', `*/${minutes} * * * *`, {
            data: { channel: msg.channel.id },
            catchUp: true
        });

        return msg.send('COMMAND_AUTOMEME_ENABLED', [msg.channel.toString(), minutes]);
    }

}
