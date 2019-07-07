import { Command, CommandStore, KlasaMessage, KlasaGuild, Duration } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, GuildMember, User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [member, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[]> {
        let muteRole = (msg.guild as Guild).roles.get((msg.guild as KlasaGuild).settings.get('roles.muted')) || (msg.guild as Guild).roles.find(r => r.name.toLowerCase() === 'muted');

        if (!muteRole) throw `A mute role was not found for this guild`;
        if (!member.roles.has(muteRole.id)) throw 'The member is not muted';

        await member.roles.remove(muteRole.id).catch((e) => { throw e; });

        const data = {
            id: (msg.guild as KlasaGuild).settings.get('modlogs.total'),
            moderator: (msg.author as User).id,
            user: member.id,
            reason: reason,
            time: Date.now(),
            type: 'Unmute'
        };

        (msg.guild as Guild).settings.update('modlogs.cases', data, { action: 'add' });
        (msg.guild as Guild).settings.update('modlogs.total', (msg.guild as KlasaGuild).settings.get('modlogs.total') + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${member.toString()} was unmuted. With reason of: ${reason}`);
    }
}
