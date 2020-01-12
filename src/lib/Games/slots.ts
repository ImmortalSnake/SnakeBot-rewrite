import { Client, Message, MessageEmbed, User } from 'discord.js';

export default class Slots {

    client: Client;
    msg: Message;

    public slots = ['🍇', '🍒', '🍋'];

    constructor(client: Client, msg: Message) {

        this.client = client;
        this.msg = msg;
    }


    public async play() {
        const slot1 = this.slot;
        const slot2 = this.slot;
        const slot3 = this.slot;

        const embed = new MessageEmbed()
            .setAuthor((this.msg.author as User).tag, (this.msg.author as User).displayAvatarURL());

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
