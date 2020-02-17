import { CommandStore, KlasaMessage, Duration } from 'klasa';
import { GuildMember, Role } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import ModLog from '../../lib/structures/ModLog';
import Util from '../../lib/utils/Util';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5,
            examples: ['@Jeff Pinged Admin role for no reason --duration=30min']
        });
    }

    public async run(msg: KlasaMessage, [member, reason]: [GuildMember, string?]): Promise<KlasaMessage | KlasaMessage[]> {
        const [muteRole] = await msg.guildSettings.resolve('roles.mute') as [Role];

        if (!muteRole) throw `A mute role was not found for this guild`;
        if (member.roles.highest.position >= msg.member!.roles.highest.position && !msg.hasAtLeastPermissionLevel(7)) throw 'You cannot mute this user.';
        if (member.roles.has(muteRole.id)) throw 'The member is already muted.';

        const { duration } = this.parseDuration(msg);
        await member.roles.add(muteRole.id, reason);

        return new ModLog(msg, 'Mute')
            .setUser(member.user)
            .setReason(reason)
            .setDuration(duration?.offset)
            .save()
            .then(async () => {
                if (duration) {
                    return this.client.schedule.create('unmute', duration.offset, { data: { guild: msg.guild!.id, user: member.id } })
                        .then(() => msg.sendMessage(`${member.user.tag} got temporarily muted for ${Util.msToDuration(duration.offset)}.${reason ? ` With reason of: ${reason}` : ''}`));
                }

                return msg.sendMessage(`${member.toString()} was muted.${reason ? ` With reason of: ${reason}` : ''}`);
            });
    }

    private parseDuration(msg: KlasaMessage) {
        const durationFlag = msg.flagArgs.duration || msg.flagArgs.time;
        const duration = durationFlag ? new Duration(durationFlag) : null;

        if (duration && (duration.offset < 0 || duration.offset > 2592000000)) throw 'Invalid mute duration: minimum is 1 minute and max is 30 days';

        return { duration };
    }

}
