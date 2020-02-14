import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['KICK_MEMBERS'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [member, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[]> {
        if (member.id === msg.author.id) throw ':x: You cannot kicl yourself!';
        if (member.id === this.client.id) throw ':x: I cannot kick myself';

        if (member) {
            if (member.roles.highest.position >= msg.member!.roles.highest.position) throw ':x: You cannot kick this user!';
            if (!member.kickable) throw ':x: Cannot kick this user!';
        }


        await member.send(`You were kicked from ${msg.guild!.name} for reason:\n${reason}`).catch(() => null);
        await member.kick(reason);

        const data = {
            id: msg.guildSettings.get('modlogs.total') as number,
            moderator: msg.author.id,
            user: member.id,
            reason,
            time: Date.now(),
            type: 'Kick'
        };

        await msg.guildSettings.update('modlogs.cases', data, { arrayAction: 'add' });
        await msg.guildSettings.update('modlogs.total', (msg.guildSettings.get('modlogs.total') as number) + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${member.toString()} was kicked for reason **${reason}**`);
    }

}
