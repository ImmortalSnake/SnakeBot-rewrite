import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import ModLog from '../../lib/structures/ModLog';
import Util from '../../lib/utils/Util';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> <duration:duration> [reason:...str]',
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5,
            examples: ['@Jeff 30min Pinged Admin role for no reason']
        });
    }

    public async run(msg: KlasaMessage, [member, duration, reason]: [GuildMember, Date, string?]): Promise<KlasaMessage | KlasaMessage[]> {
        const roleID = msg.guildSettings.get('roles.mute') as string;
        const muteRole = msg.guild?.roles.cache.get(roleID);
        if (!muteRole) throw msg.language.get('COMMAND_MUTE_NO_ROLE', msg.guildSettings.get('prefix'));

        if (member.roles.highest.position >= msg.member!.roles.highest.position && !await msg.hasAtLeastPermissionLevel(7)) throw 'You cannot mute this user.';
        if (member.roles.cache.has(muteRole.id)) throw 'The member is already muted.';

        const offset = duration.getTime() - Date.now();

        await member.roles.add(muteRole.id, reason);
        await new ModLog(msg, 'Mute')
            .setUser(member.user)
            .setReason(reason)
            .setDuration(offset)
            .save();

        return this.client.schedule.create('unmute', duration, { data: { guild: msg.guild!.id, user: member.id }, catchUp: true })
            .then(() => msg.sendMessage(`✅ ${member.user.toString()} got temporarily muted for ${Util.msToDuration(offset)}.${reason ? ` With reason of: **${reason}**` : ''}`));
    }

}
