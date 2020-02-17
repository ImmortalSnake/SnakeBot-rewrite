import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../../lib/structures/base/SnakeCommand';
import ModLog, { ModLogData } from '../../../lib/structures/ModLog';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<id:int> [reason:...string]',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [ID, reason]: [number, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const cases = msg.guildSettings.get('modlogs') as ModLogData[];
        const log = cases.find(c => c.id === ID);
        if (!log) throw 'Could not find a case with that ID';

        await msg.guildSettings.update('modlogs', log, { arrayAction: 'remove' });
        log.reason = reason;
        await msg.guildSettings.update('modlogs.cases', log, { arrayAction: 'add' });

        return msg.send(ModLog.renderRawEmbed(msg, log));
    }

}
