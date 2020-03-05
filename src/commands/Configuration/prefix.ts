import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[prefix:...str]',
            permissionLevel: 6,
            requiredPermissions: ['EMBED_LINKS'],
            examples: ['', '?']
        });
    }

    public async run(msg: KlasaMessage, [prefix]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        if (prefix) return msg.guildSettings.update('prefix', prefix).then(() => msg.send(`Updated the prefix to \`${prefix}\``));
        return msg.send(`Prefix for this guild is \`${msg.guildSettings.get('prefix')}\``);
    }

}
