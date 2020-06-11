import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, Role } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import ModLog from '../../lib/structures/ModLog';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [member, reason]: [GuildMember, string?]): Promise<KlasaMessage | KlasaMessage[]> {
        const [muteRole] = await msg.guildSettings.get('roles.mute') as [Role];

        if (!muteRole) throw msg.language.get('COMMAND_MUTE_NO_ROLE', msg.guildSettings.get('prefix'));
        if (!member.roles.cache.has(muteRole.id)) throw msg.language.get('COMMAND_UNMUTE_NOT_MUTED');

        await member.roles.remove(muteRole.id);
        return new ModLog(msg, 'Unmute')
            .setUser(member.user)
            .setReason(reason)
            .save()
            .then(() => msg.sendLocale('COMMAND_UNMUTE_SUCCESS', [member.toString(), reason]));
    }

}
