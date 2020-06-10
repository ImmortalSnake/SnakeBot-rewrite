import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Hour } from '../../lib/utils/constants';
import { TextChannel } from 'discord.js';
import Util from '../../lib/utils/Util';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 5,
            cooldownLevel: 'channel',
            permissionLevel: 5,
            requiredPermissions: ['MANAGE_CHANNELS'],
            usage: '<off|seconds:integer|cooldown:cooldown>',
            examples: ['2h', 'off']
        });

        this.createCustomResolver('cooldown', (arg, possible, message) => Math.floor(this.client.arguments.get('timespan')!.run(arg, possible, message) / 1000));

    }

    public async run(msg: KlasaMessage, [cooldown]: ['off' | number]) {
        if (cooldown === 'off') cooldown = 0;
        if (cooldown > 0.006 * Hour) throw msg.language.get('COMMAND_SLOWMODE_MAX_TIME');

        await (msg.channel as TextChannel).setRateLimitPerUser(cooldown);
        return msg.send(cooldown === 0
            ? msg.language.get('COMMAND_SLOWMODE_OFF')
            : msg.language.get('COMMAND_SLOWMODE_SET', Util.msToDuration(cooldown * 1000)));

    }

}
