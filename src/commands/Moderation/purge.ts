import { CommandStore, KlasaMessage } from 'klasa';
import { User, Message, TextChannel } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { Day } from '../../lib/utils/constants';

type PurgeFilter = 'link' | 'invite' | 'bots' | 'you' | 'me' | 'upload' | User;
export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<limit:int{1,99}> [link|invite|bots|you|me|upload|user:user]',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 4,
            examples: ['25 link', '100 @Jeff']
        });
    }

    public async run(msg: KlasaMessage, [limit = 5, filter]: [number, PurgeFilter?]): Promise<KlasaMessage | KlasaMessage[] | null> {
        await msg.delete();
        let messages = await msg.channel.messages.fetch({ limit: 100 })
            .then(m => m.filter(m => m.createdTimestamp > Date.now() - (14 * Day)));
        if (filter) {
            const type = typeof filter === 'string' ? filter : 'user';
            const user = typeof filter === 'string' ? msg.author : filter;
            messages = messages.filter(this.getFilter(msg, type, user));
        }

        const del = messages.first(limit);
        if (!del) throw msg.language.get('COMMAND_PURGE_NO_MESSAGES');

        const deleted = await (msg.channel as TextChannel).bulkDelete(del);

        await msg.sendLocale('COMMAND_PURGE_SUCCESS', [deleted.size])
            .then(m => m.delete({ timeout: 10000 }));
        return null;
    }

    private getFilter(msg: KlasaMessage, filter: string, user: User) {
        switch (filter) {
            case 'link': return (mes: Message) => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content);
            case 'invite': return (mes: Message) => /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(mes.content);
            case 'bots': return (mes: Message) => mes.author.bot;
            case 'you': return (mes: Message) => mes.author.id === this.client.user!.id;
            case 'me': return (mes: Message) => mes.author.id === msg.author.id;
            case 'upload': return (mes: Message) => mes.attachments.size > 0;
            case 'user': return (mes: Message) => mes.author.id === user.id;
            default: return () => true;
        }
    }

}
