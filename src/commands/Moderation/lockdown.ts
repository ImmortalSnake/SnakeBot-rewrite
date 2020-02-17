import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { TextChannel } from 'discord.js';
import { Hour } from '../../lib/utils/constants';
import Util from '../../lib/utils/Util';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['lock', 'unlock'],
            cooldown: 5,
            cooldownLevel: 'channel',
            permissionLevel: 5,
            requiredPermissions: ['MANAGE_CHANNELS'],
            usage: '[channel:textchannel] [duration:timespan]'
        });

        this.createCustomResolver('textchannel', (arg, possible, message) => this.client.arguments.get('textChannel')!.run(arg, possible, message));
    }

    public async run(msg: KlasaMessage, [channel = msg.channel as TextChannel, duration]: [TextChannel, number]) {
        if (channel.permissionsFor(channel.guild.id)?.has('SEND_MESSAGES')) {
            if (duration && duration > 24 * Hour) throw 'Duration should be less than 24 hours';

            await channel.updateOverwrite(channel.guild.id, { SEND_MESSAGES: false });
            await channel.send(`This channel has been locked ${duration ? `for ${Util.msToDuration(duration)} ` : ''}by ${msg.author.tag}`)
                .catch(() => msg.send(`${channel.toString()} has been locked`));
            if (duration) await this.client.schedule.create('unlock', duration, { data: { channelID: channel.id } });
        } else {
            await channel.updateOverwrite(channel.guild.id, { SEND_MESSAGES: true });
            await msg.send(`Lockdown for ${channel.toString()} has been lifted`);
        }

        return null;
    }

}
