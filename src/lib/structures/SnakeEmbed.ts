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

        this.setColor(this.displayColor);
        this.setAuthor(this.client.user?.tag, this.client.user?.displayAvatarURL());
        this.setFooter(`Requested By: ${msg.author.tag}`);
    }

    public get displayColor() {
        return this.msg.guild ? this.msg.member!.displayColor : COLORS.PRIMARY;
    }

    public setLocaleDescription(key: string, ...args: any[]) {
        return this.setDescription(this.msg.language.get(key, ...args));
    }

}
