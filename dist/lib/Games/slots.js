"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Slots {
    constructor(client, msg) {
        this.slots = ['🍇', '🍒', '🍋'];
        this.client = client;
        this.msg = msg;
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            const slot1 = this.slot, slot2 = this.slot, slot3 = this.slot;
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(this.msg.author.tag, this.msg.author.displayAvatarURL());
            if (slot1 === slot2 && slot1 === slot3) {
                return embed.setDescription(`${slot1}|${slot2}|${slot3}\nYou won`)
                    .setColor('GREEN');
            }
            else {
                return embed.setDescription(`${slot1}|${slot2}|${slot3}\nYou lost`)
                    .setColor('RED');
            }
        });
    }
    get slot() {
        return this.slots[Math.floor(Math.random() * this.slots.length)];
    }
}
exports.default = Slots;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xvdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0dhbWVzL3Nsb3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUU7QUFFakUsTUFBcUIsS0FBSztJQU90QixZQUFZLE1BQWMsRUFBRSxHQUFZO1FBRmpDLFVBQUssR0FBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFJL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUdZLElBQUk7O1lBQ2IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksRUFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRTtpQkFDM0IsU0FBUyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBZSxDQUFDLEdBQUcsRUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFNUYsSUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7Z0JBQ3BDLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxXQUFXLENBQUM7cUJBQzVELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssWUFBWSxDQUFDO3FCQUM3RCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDO0tBQUE7SUFFRCxJQUFZLElBQUk7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDSjtBQWxDRCx3QkFrQ0MifQ==