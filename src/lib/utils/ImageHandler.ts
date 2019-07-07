import { KlasaMessage } from 'klasa';
import { Message, User } from 'discord.js';
import fetch from 'node-fetch';

interface ImageOptions {
    user?: User;
}

export default class ImageHandler {

    private readonly dankYoutubeURL = (msg: KlasaMessage, text: string) => `https://dankmemer.services/api/youtube?avatar1=${(msg.author as User).displayAvatarURL()}&username1=${(msg.author as User).username}&text=${text}`;
    private readonly dankTweetURL = (msg: KlasaMessage, text: string) => `https://dankmemer.services/api/tweet?avatar1=${(msg.author as User).displayAvatarURL()}&username1=${(msg.author as User).username}&text=${text}`;
    private readonly dankHitlerURL = (image: string) => `https://dankmemer.services/api/hitler?avatar1=${image}`;
    private readonly dankMagikURL = (image: string) => `https://dankmemer.services/api/magik?avatar1=${image}`;
    private readonly dankTriggerURL = (image: string) => `https://dankmemer.services/api/trigger?avatar1=${image}`;
    private readonly dankWantedURL = (image: string) => `https://dankmemer.services/api/wanted?avatar1=${image}`;

    public async getImage(msg: KlasaMessage, { user }: ImageOptions): Promise<string> {
        const messages = await msg.channel.messages.fetch();
        const sort = messages.sort((a: Message, b: Message) => b.createdTimestamp - a.createdTimestamp);

        let img: any = null;
        sort.some(m => {
            const [att] = m.attachments.values();
            if (att && att.height) {
                const image = fetch(att.url)
                    .then((response) => response.url)
                    .catch();

                if (image) img = image;
                return image ? true : false;
            } else return false;
        });

        return img || (user || msg.author as User).displayAvatarURL();
    }

    public async dankImage(url: string) {
        return fetch(url, {
            headers: {
                Authorization: process.env.DANK_KEY as string
            }
        });
    }

    public async ytImage(msg: KlasaMessage, text: string) {
        return this.dankImage(this.dankYoutubeURL(msg, text));
    }

    public async tweetImage(msg: KlasaMessage, text: string) {
        return this.dankImage(this.dankTweetURL(msg, text));
    }

    public async hitlerImage(msg: KlasaMessage, user: User) {
        const image = await this.getImage(msg, { user }).catch((e) => { throw e; });
        return this.dankImage(this.dankHitlerURL(image));
    }

    public async magikImage(msg: KlasaMessage, user: User) {
        const image = await this.getImage(msg, { user }).catch((e) => { throw e; });
        return this.dankImage(this.dankMagikURL(image));
    }

    public async triggerImage(msg: KlasaMessage, user: User) {
        const image = await this.getImage(msg, { user }).catch((e) => { throw e; });
        return this.dankImage(this.dankTriggerURL(image));
    }

    public async wantedImage(msg: KlasaMessage, user: User) {
        const image = await this.getImage(msg, { user }).catch((e) => { throw e; });
        return this.dankImage(this.dankWantedURL(image));
    }
}
