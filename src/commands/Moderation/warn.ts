import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import ModLog from '../../lib/structures/ModLog';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5,
            examples: ['@Jeff pinged mods for no reason']
        });
    }

    public async run(msg: KlasaMessage, [member, reason]: [GuildMember, string?]): Promise<KlasaMessage | KlasaMessage[]> {
        if (member.roles.highest.position >= msg.member!.roles.highest.position) throw ':x: You cannot warn this user!';
        await member.send(msg.language.get('COMMAND_WARN_DM', msg.guild!.name, reason)).catch(() => null);

        return new ModLog(msg, 'Warn')
            .setUser(member.user)
            .setReason(reason)
            .save()
            .then(() => msg.sendLocale('COMMAND_WARN_SUCCESS', [member.toString(), reason || 'N/A']));
    }

}
