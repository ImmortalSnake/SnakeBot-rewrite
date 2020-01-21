import { Client, Message, MessageEmbed } from 'discord.js';

export default class Slots {

    public client: Client;
    public msg: Message;

    public slots = ['🍇', '🍒', '🍋'];

    public constructor(msg: Message) {

        this.client = msg.client;
        this.msg = msg;
    }


    public play() {
        const slot1 = this.slot;
        const slot2 = this.slot;
        const slot3 = this.slot;

        const embed = new MessageEmbed()
            .setAuthor(this.msg.author!.tag, this.msg.author!.displayAvatarURL());

        if (slot1 === slot2 && slot1 === slot3) {
            return embed.setDescription(`${slot1}|${slot2}|${slot3}\nYou won`)
                .setColor('GREEN');
        }
        return embed.setDescription(`${slot1}|${slot2}|${slot3}\nYou lost`)
            .setColor('RED');

    }

    private get slot(): string {
        return this.slots[Math.floor(Math.random() * this.slots.length)];
    }

}
