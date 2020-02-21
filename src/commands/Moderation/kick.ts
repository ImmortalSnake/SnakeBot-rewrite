import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import ModLog from '../../lib/structures/ModLog';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['KICK_MEMBERS'],
            permissionLevel: 5,
            description: lang => lang.get('COMMAND_KICK_DESCRIPTION'),
            extendedHelp: lang => lang.get('COMMAND_KICK_EXTENDED'),
            examples: ['@Jeff ']
        });
    }

    public async run(msg: KlasaMessage, [member, reason]: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[]> {
        if (member.id === msg.author.id) throw msg.language.get('MODERATION_SELF', 'kick');
        if (member.id === this.client.user!.id) throw msg.language.get('MODERATION_ME', 'kick');

        if (member) {
            if (member.roles.highest.position >= msg.member!.roles.highest.position) throw ':x: You cannot kick this user!';
            if (!member.kickable) throw ':x: Cannot kick this user!';
        }


        await member.send(`You were kicked from ${msg.guild!.name} for reason:\n${reason}`).catch(() => null);
        await member.kick(reason);

        return new ModLog(msg, 'Kick')
            .setUser(member.user)
            .setReason(reason)
            .save()
            .then(() => msg.sendMessage(`${member.toString()} was kicked for reason **${reason}**`));
    }

}
