import { ExtendableStore, Extendable } from 'klasa';
import { Message, MessageEmbed } from 'discord.js';

export interface MessagePromptOptions {
    user?: string;
    time?: number;
    max?: number;
    delete?: boolean;
    filter?: (message: Message) => boolean;
    embed?: MessageEmbed;
}

export interface MessageAskOptions {
    user?: string;
    time?: number;
    delete?: boolean;
    embed?: MessageEmbed;
}


export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, {
            appliesTo: [Message]
        });

    }

    public async prompt(this: Message, content: string | MessageEmbed, options: MessagePromptOptions = {}): Promise<Message> {
        const mess = await this.channel.send(content, options.embed);
        const collected = await this.channel.awaitMessages(m => m.author.id === (options.user ? options.user : this.author.id) && (!options.filter || options.filter(m)), {
            time: options.time ?? 60000,
            max: options.max ?? 1
        });

        if (options.delete) await mess.delete();
        if (collected.size === 0) throw 'Timeout! Try again';
        return collected.first()!;
    }

    public async ask(this: Message, content: string | MessageEmbed, options: MessageAskOptions = {}): Promise<boolean> {
        const mess = await this.channel.send(content);
        await mess.react('❌');
        await mess.react('✅');

        const collected = await mess.awaitReactions((reaction, user) => ['❌', '✅'].includes(reaction.emoji.name) && user.id === this.author.id, {
            time: options.time ?? 60000,
            max: 1
        });

        if (options.delete) await mess.delete();
        if (collected.size === 0) throw 'Timeout! Try again';
        return collected.first()!.emoji.name === '✅';
    }

    public get parseFlags(this: Message) {
        const flags: Record<string, string | boolean> = {};
        this.content.split('--').slice(1).forEach(flag => {
            const [key, ...value] = flag.split(/[ =]/g);
            flags[key] = value.join(' ') || true;
        });

        return flags;
    }

}
