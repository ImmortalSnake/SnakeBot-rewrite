import { CommandStore, KlasaMessage } from 'klasa';
import { User, Message } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

type PurgeFilter = 'link' | 'invite' | 'bots' | 'you' | 'me' | 'upload' | User;
export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<limit:int{1,99}> [link|invite|bots|you|me|upload|user:user]',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 4
        });
    }

    public async run(msg: KlasaMessage, [limit = 5, filter]: [number, PurgeFilter?]): Promise<KlasaMessage | KlasaMessage[] | null> {
        let messages = await msg.channel.messages.fetch({ limit: 100 });
        if (messages.size < 1) throw 'No messages were found!';
        if (filter) {
            const type = typeof filter === 'string' ? filter : 'user';
            const user = typeof filter === 'string' ? msg.author : filter;
            messages = messages.filter(this.getFilter(msg, type, user));
        }

        const del = messages.first(limit);
        const deleted = await msg.channel.bulkDelete(del);

        await msg.channel.send(`**:wastebasket: Deleted ${deleted.size} messages!**`).then(m => m.delete({ timeout: 10000 }));
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
