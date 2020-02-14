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

    public init() {
        return this.setColor(this.displayColor)
            .setAuthor(this.client.user?.tag, this.client.user?.displayAvatarURL())
            .setFooter(`Requested By: ${this.msg.author.tag}`);
    }

    public setLocaleDescription(key: string, ...args: any[]) {
        return this.setDescription(this.msg.language.get(key, ...args));
    }

}
