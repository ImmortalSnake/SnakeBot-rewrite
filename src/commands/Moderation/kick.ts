import { Command, CommandStore, KlasaMessage, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';
import { Guild, GuildMember, User } from 'discord.js';
import LogHandler from '../../lib/utils/LogHandler';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            runIn: ['text'],
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['KICK_MEMBERS'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[]> {
        if (user && user.permissions.has('MANAGE_GUILD')) return msg.sendMessage('Cannot kick this user');

        await user.send(`You were kicked from ${(msg.guild as Guild).name} for reason:\n${reason}`).catch(console.log);
        await user.kick(reason).catch((e) => { throw e; });

        const data = {
            id: (msg.guild as KlasaGuild).settings.get('modlogs.total'),
            moderator: (msg.author as User).id,
            user: user.id,
            reason: reason,
            time: Date.now(),
            type: 'Kick'
        };

        (msg.guild as Guild).settings.update('modlogs.cases', data, { action: 'add' });
        (msg.guild as Guild).settings.update('modlogs.total', (msg.guild as KlasaGuild).settings.get('modlogs.total') + 1);
        await LogHandler(msg, data);

        return msg.sendMessage(`${user.toString()} was banned for reason **${reason}**`);
    }
}
