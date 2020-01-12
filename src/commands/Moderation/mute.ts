import { CommandStore, KlasaMessage, Duration } from 'klasa';
import { Guild, GuildMember, User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [duration:time] [reason:...str]',
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [member, duration, reason = 'N/A']: [GuildMember, any, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const muteRole = msg.guild!.roles.get(msg.guildSettings.get('roles.muted') as string) || msg.guild!.roles.find(r => r.name.toLowerCase() === 'muted');

        if (!muteRole) throw `A mute role was not found for this guild`;
        if (member.roles.highest.position >= (msg.member as GuildMember).roles.highest.position && !msg.hasAtLeastPermissionLevel(7)) throw 'You cannot mute this user.';
        if (member.roles.has(muteRole.id)) throw 'The member is already muted.';

        await member.roles.add(muteRole.id);

        const data = {
            id: msg.guildSettings.get('modlogs.total') as number,
            moderator: (msg.author as User).id,
            user: member.id,
            reason,
            time: Date.now(),
            type: 'Mute',
            duration: duration - Date.now()
        };

        await msg.guildSettings.update('modlogs.cases', data, { arrayAction: 'add' });
        await msg.guildSettings.update('modlogs.total', (msg.guildSettings.get('modlogs.total') as number) + 1);
        await LogHandler(msg, data);

        if (duration) {
            await this.client.schedule.create('unmute', duration, {
                data: {
                    guild: (msg.guild as Guild).id,
                    user: member.id
                }
            });
            return msg.sendMessage(`${member.user.tag} got temporarily muted for ${Duration.toNow(duration)}.${reason ? ` With reason of: ${reason}` : ''}`);
        }

        return msg.sendMessage(`${member.toString()} was muted.${reason ? ` With reason of: ${reason}` : ''}`);
    }

}
