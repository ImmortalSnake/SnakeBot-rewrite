import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../../lib/structures/base/SnakeCommand';
import ModLog, { ModLogData } from '../../../lib/structures/ModLog';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<id:int> [reason:...string]',
            requiredPermissions: ['EMBED_LINKS'],
            permissionLevel: 5,
            examples: ['5 false reports']
        });
    }

    public async run(msg: KlasaMessage, [ID, reason]: [number, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const cases = msg.guildSettings.get('modlogs') as ModLogData[];
        const log = cases.find(c => c.id === ID);
        if (!log) throw msg.language.get('COMMAND_CASE_INVALID', ID);

        await msg.guildSettings.update('modlogs', log, { action: 'remove' });
        log.reason = reason;
        await msg.guildSettings.update('modlogs', log, { action: 'add' });

        return ModLog.renderRawEmbed(msg, log).then(embed => msg.send(embed));
    }

}
