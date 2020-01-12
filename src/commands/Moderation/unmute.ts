import { CommandStore, KlasaMessage } from 'klasa';
import { Guild, GuildMember, User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [member, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const muteRole = msg.guild!.roles.get(msg.guildSettings.get('roles.muted') as string) || (msg.guild as Guild).roles.find(r => r.name.toLowerCase() === 'muted');

        if (!muteRole) throw `A mute role was not found for this guild`;
        if (!member.roles.has(muteRole.id)) throw 'The member is not muted';

        await member.roles.remove(muteRole.id);

        const data = {
            id: msg.guildSettings.get('modlogs.total') as number,
            moderator: (msg.author as User).id,
            user: member.id,
            reason,
            time: Date.now(),
            type: 'Unmute'
        };

        await msg.guildSettings.update('modlogs.cases', data, { arrayAction: 'add' });
        await msg.guildSettings.update('modlogs.total', (msg.guildSettings.get('modlogs.total') as number) + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${member.toString()} was unmuted. With reason of: ${reason}`);
    }

}
