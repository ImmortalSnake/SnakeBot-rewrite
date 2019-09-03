import { Message, TextChannel, User } from 'discord.js';

export default class Util {

    static yes: string[];
    static no: string[];

    public readonly yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
    public readonly no = ['no', 'n', 'nah', 'nope', 'nop'];

    public async verify(channel: TextChannel, user: User, time = 30000): Promise<boolean | number> {
        const filter = (res: Message) => {
            const value = res.content.toLowerCase();
            return (res.author as User).id === user.id && (this.yes.includes(value) || this.no.includes(value));
        };
        const verify = await channel.awaitMessages(filter, {
            max: 1,
            time,
        });
        if (!verify.size) return 0;
        const choice = (verify.first() as Message).content.toLowerCase();
        if (this.yes.includes(choice)) return true;
        if (this.no.includes(choice)) return false;
        return false;
    }

   public number_string(num: number): string {
        switch (num) {
            case 1: return 'one';
            case 2: return 'two';
            case 3: return 'three';
            case 4: return 'four';
            case 5: return 'five';
            case 6: return 'six';
            case 7: return 'seven';
            case 8: return 'eight';
            case 9: return 'nine';
            case 0: return 'zero';
            default: return '';
        }
    }


    static comma(num: number) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

}
