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
const klasa_1 = require("klasa");
class GuildMemberAddEvent extends klasa_1.Event {
    constructor() {
        super(...arguments);
        this.regex = (type) => new RegExp(`\{\{(${type}+)\}\}`, 'igm');
    }
    run(member) {
        return __awaiter(this, void 0, void 0, function* () {
            const welcomeChan = member.guild.channels.get(member.guild.settings.get('channel.welcome'));
            if (welcomeChan) {
                let welcomeMess = member.guild.settings.get('message.welcome') || 'Hi {{user}} welcome to {{guild}}';
                welcomeMess = this.format(welcomeMess, member);
                welcomeChan.send(welcomeMess);
            }
        });
    }
    format(mess, member) {
        return mess
            .replace(this.regex('member'), member.toString())
            .replace(this.regex('guild'), member.guild.name);
    }
}
exports.default = GuildMemberAddEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGRNZW1iZXJBZGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL2d1aWxkTWVtYmVyQWRkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBOEI7QUFHOUIsTUFBcUIsbUJBQW9CLFNBQVEsYUFBSztJQUF0RDs7UUFFWSxVQUFLLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFnQjlFLENBQUM7SUFkZ0IsR0FBRyxDQUFFLE1BQW1COztZQUNqQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQWdCLENBQUM7WUFDM0csSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksa0NBQWtDLENBQUM7Z0JBQ3JHLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDL0MsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNqQztRQUNMLENBQUM7S0FBQTtJQUVPLE1BQU0sQ0FBQyxJQUFZLEVBQUUsTUFBbUI7UUFDNUMsT0FBTyxJQUFJO2FBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2hELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNKO0FBbEJELHNDQWtCQyJ9