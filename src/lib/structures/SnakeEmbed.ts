import { MessageEmbed } from 'discord.js';
import { KlasaMessage, KlasaClient } from 'klasa';
import { COLORS } from '../utils/constants';

export default class SnakeEmbed extends MessageEmbed {

    public client: KlasaClient;
    public msg: KlasaMessage;
    public constructor(msg: KlasaMessage) {
        super();

        this.client = msg.client as KlasaClient;
        this.msg = msg;

    }

    public get displayColor() {
        return this.msg.guild ? this.msg.member!.displayColor : COLORS.PRIMARY;
    }

    public get language() {
        return this.msg.language;
    }

    public init() {
        return this.setColor(this.displayColor)
            .setAuthor(this.client.user?.tag, this.client.user?.displayAvatarURL())
            .setFooter(`Requested By: ${this.msg.author.tag}`, this.msg.author.displayAvatarURL());
    }

    public setLocaleDescription(key: string, ...args: any[]) {
        return this.setDescription(this.language.get(key, ...args));
    }

    public setLocaleTitle(key: string, ...args: any[]) {
        return this.setTitle(this.language.get(key, ...args));
    }

    public addLocaleField([key, ...args1]: [string, any[]], [value, ...args2]: [string, any[]], inline?: boolean) {
        return this.addField(this.language.get(key, ...args1), this.language.get(value, ...args2), inline);
    }

}
