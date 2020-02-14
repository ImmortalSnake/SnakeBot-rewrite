import { Extendable, ExtendableStore } from 'klasa';
import { TextChannel, DMChannel } from 'discord.js';

export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, {
            appliesTo: [TextChannel, DMChannel]
        });

    }

    public async fetchImage(this: TextChannel | DMChannel) {
        const messages = await this.messages.fetch();
        const sorted = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp);

        for (const m of sorted.values()) {
            const [attachment] = m.attachments.values();
            if (attachment?.height) return attachment;
        }
    }

}
