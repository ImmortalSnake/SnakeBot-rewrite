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
            usage: '<reset|off|seconds:int|cooldown:timespan>',
            examples: ['2h']
        });

        this.createCustomResolver('cooldown', (arg, possible, message) => this.client.arguments.get('timespan')!.run(arg, possible, message) / 1000);
    }

    public async run(msg: KlasaMessage, [cooldown]: ['reset' | 'off' | number]) {
        if (cooldown === 'reset' || cooldown === 'off') cooldown = 0;
        if (cooldown > 6 * Hour) throw 'Cannot set the cooldown to more than 6 hours!';

        await (msg.channel as TextChannel).setRateLimitPerUser(cooldown);
        return msg.send(cooldown === 0
            ? 'Slowmode for this channel has been turned off'
            : `Slowmode for ${Util.msToDuration(cooldown)} has been set for this channel`);

    }

}
