import { CommandStore, KlasaMessage, Duration } from 'klasa';
import { User } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import ModLog from '../../lib/structures/ModLog';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:user> [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5,
            description: lang => lang.get('COMMAND_BAN_DESCRIPTION'),
            extendedHelp: lang => lang.get('COMMAND_BAN_EXTENDED'),
            examples: ['@Jeff Mention Spam', '@Jeff Inappropriate Content --days=2 --duration="5 Hours"']
        });
    }

    public async run(msg: KlasaMessage, [user, reason]: [User, string?]): Promise<KlasaMessage | KlasaMessage[]> {
        if (user.id === msg.author.id) throw ':x: You cannot ban yourself!';
        if (user.id === this.client.user!.id) throw ':x: I cannot ban myself';

        const member = msg.guild!.members.get(user.id);
        if (member) {
            if (member.roles.highest.position >= msg.member!.roles.highest.position) throw ':x: You cannot ban this user!';
            if (!member.bannable) throw ':x: Cannot ban this user!';
        }

        const { duration, days } = this.parseDuration(msg);

        await user.send(`You were banned from **${msg.guild!.name}** for reason:\n**${reason}**`).catch(() => null);
        await msg.guild!.members.ban(user.id, { reason, days });

        return new ModLog(msg, 'Ban')
            .setUser(user)
            .setReason(reason)
            .setDuration(duration?.offset)
            .save()
            .then(async () => {
                if (duration) {
                    return this.client.schedule.create('tempBan', duration.offset, { data: { guildID: msg.guild!.id, userID: user.id }, catchUp: true })
                        .then(() => msg.send(`${user.toString()} was temporarily banned for reason **${reason}**`));
                }

                return msg.sendMessage(`${user.toString()} was banned for reason **${reason}**`);
            });
    }

    private parseDuration(msg: KlasaMessage) {
        const durationFlag = msg.flagArgs.duration || msg.flagArgs.time;
        const duration = durationFlag ? new Duration(durationFlag) : null;

        const msgFlag = msg.flagArgs.messages || msg.flagArgs.msgs || msg.flagArgs.days;
        const days = msgFlag ? Number(msgFlag) : undefined;

        if (duration && (duration.offset < 0 || duration.offset > 2592000000)) throw 'Invalid ban duration, minimum is 0s and maximum is 30 days';
        if (days && (days < 1 || days > 7)) throw 'Invalid days of messages to be deleted. 1-7 only';

        return { duration, days };
    }

}
