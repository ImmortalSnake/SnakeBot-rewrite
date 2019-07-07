import { Command, CommandStore, KlasaMessage, KlasaGuild, Duration } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, GuildMember, User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [duration:time] [reason:...str]',
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [member, duration, reason = 'N/A']: [GuildMember, any, string]): Promise<KlasaMessage | KlasaMessage[]> {
        let muteRole = (msg.guild as Guild).roles.get((msg.guild as KlasaGuild).settings.get('roles.muted')) || (msg.guild as Guild).roles.find(r => r.name.toLowerCase() === 'muted');

        if (!muteRole) throw `A mute role was not found for this guild`;
        if (member.roles.highest.position >= (msg.member as GuildMember).roles.highest.position && !msg.hasAtLeastPermissionLevel(7)) throw 'You cannot mute this user.';
        if (member.roles.has(muteRole.id)) throw 'The member is already muted.';

        await member.roles.add(muteRole.id).catch((e) => { throw e; });

        const data = {
            id: (msg.guild as KlasaGuild).settings.get('modlogs.total'),
            moderator: (msg.author as User).id,
            user: member.id,
            reason: reason,
            time: Date.now(),
            type: 'Mute',
            duration: duration - Date.now()
        };

        (msg.guild as Guild).settings.update('modlogs.cases', data, { action: 'add' });
        (msg.guild as Guild).settings.update('modlogs.total', (msg.guild as KlasaGuild).settings.get('modlogs.total') + 1);
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
