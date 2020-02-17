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
        const [muteRole] = await msg.guildSettings.resolve('roles.mute') as [Role];

        if (!muteRole) throw `A mute role was not found for this guild`;
        if (!member.roles.has(muteRole.id)) throw 'The member is not muted';

        await member.roles.remove(muteRole.id);
        return new ModLog(msg, 'Unmute')
            .setUser(member.user)
            .setReason(reason)
            .save()
            .then(() => msg.sendMessage(`${member.toString()} was unmuted${reason ? ` for reason **${reason}**` : ''}`));
    }

}
