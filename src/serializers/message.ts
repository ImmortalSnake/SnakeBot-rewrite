
import { Language, Serializer, KlasaGuild, SchemaEntry } from 'klasa';
import { Message } from 'discord.js';
const { regex } = Serializer;

export default class extends Serializer {

    public async deserialize(data: any, piece: SchemaEntry, language: Language, guild: KlasaGuild) {
        if (data instanceof Message) return data;
        if (typeof data !== 'string') throw this.error(language, piece.key);
        const [channelID, messageID] = data.split('/', 2);
        if (!(channelID && messageID)) throw this.error(language, piece.key);

        const channel = await this.client.serializers.get('channel')!.deserialize(channelID,
            { key: piece.key, type: 'textchannel' } as SchemaEntry, language, guild);
        const messagePromise = regex.snowflake.test(messageID) ? channel.messages.fetch(messageID) : null;
        if (messagePromise) return messagePromise;
        // Yes, the split is supposed to be text, not code
        throw language.get('RESOLVER_INVALID_MESSAGE', `${piece.key}.split('/')[1]`);
    }

    public serialize(data: any) {
        return `${data.channel.id}/${data.id}`;
    }

    public stringify({ data, channel }: any): string {
        // channel might be a message, I sure as heck don't know
        return ((channel.messages || channel.channel.messages).get(data) || { content: (data && data.content) || data }).content;
    }

    private error(language: Language, name: string) {
        // Yes, the split is supposed to be text, not code
        return [
            language.get('RESOLVER_INVALID_CHANNEL', `${name}.split('/')[0]`),
            language.get('RESOLVER_INVALID_MESSAGE', `${name}.split('/')[1]`)
        ].join(' ');
    }

}
