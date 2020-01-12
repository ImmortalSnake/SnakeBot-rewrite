import { CommandStore, KlasaMessage } from 'klasa';
import { User, Message, ClientUser } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';


export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<limit:int{1,99}> [link|invite|bots|you|me|upload|user:user]',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 4
        });
    }

    public async run(msg: KlasaMessage, [limit = 5, filter = null]: [number, any]): Promise<KlasaMessage | KlasaMessage[] | null> {
        let messages = await msg.channel.messages.fetch({ limit: 100 });
        if (messages.size < 1) throw 'No messages were found!';
        if (filter) {
            // const user = typeof filter === 'string' ? filter : null;
            const type = typeof filter === 'string' ? filter : 'user';
            messages = messages.filter(this.getFilter(msg, type, msg.author) as any);
        }
        messages = messages.array().slice(0, limit) as any;

        const deleted = await msg.channel.bulkDelete(messages);
        await msg.channel.send(`**:wastebasket: Deleted ${deleted.size} messages!**`).then(m => (m as Message).delete());
        return null;
    }

    private getFilter(msg: KlasaMessage, filter: string, user: User) {
        switch (filter) {
            case 'link': return (mes: KlasaMessage) => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content);
            case 'invite': return (mes: KlasaMessage) => /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(mes.content);
            case 'bots': return (mes: KlasaMessage) => (mes.author as User).bot;
            case 'you': return (mes: KlasaMessage) => (mes.author as User).id === (this.client.user as ClientUser).id;
            case 'me': return (mes: KlasaMessage) => (mes.author as User).id === (msg.author as User).id;
            case 'upload': return (mes: KlasaMessage) => mes.attachments.size > 0;
            case 'user': return (mes: KlasaMessage) => (mes.author as User).id === user.id;
            default: return () => true;
        }
    }

}
