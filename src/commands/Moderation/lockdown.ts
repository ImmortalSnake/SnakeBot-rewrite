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
        if (!channel.manageable) throw msg.language.get('COMMAND_LOCKDOWN_NO_PERMS');
        if (channel.permissionsFor(channel.guild.id)?.has('SEND_MESSAGES')) {
            if (duration && duration > 24 * Hour) throw msg.language.get('COMMAND_LOCKDOWN_INVALID_DURATION');

            await channel.updateOverwrite(channel.guild.id, { SEND_MESSAGES: false });
            await channel.sendLocale('COMMAND_LOCKDOWN_LOCK', [duration, msg.author.tag])
                .catch(() => msg.sendLocale('COMMAND_LOCKDOWN_SUCCESS', [channel.toString()]))
                .catch();
            if (duration) await this.client.schedule.create('unlock', duration, { data: { channelID: channel.id } });
        } else {
            await channel.updateOverwrite(channel.guild.id, { SEND_MESSAGES: true });
            await msg.sendLocale('COMMAND_LOCKDOWN_UNLOCK', [channel.toString()]);
        }

        return null;
    }

}
