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
class AFKMonitor extends klasa_1.Monitor {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            ignoreOthers: false
        });
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                return;
            const afkusers = msg.guild.settings.get('afkusers');
            for (const user of afkusers) {
                if (msg.author.id === user.id) {
                    const afk = afkusers.find(a => a.id === msg.author.id);
                    msg.guild.settings.update('afkusers', afk, { action: 'remove' });
                    return msg.channel.send(`Welcome back ${msg.author.toString()}! I have removed your AFK`);
                }
                else if (msg.mentions.members.has(user.id)) {
                    const _user = this.client.users.get(user.id);
                    const afk = afkusers.find(a => a.id === _user.id);
                    return msg.channel.send(`${_user.tag} is currently afk with reason: ${afk.reason}`);
                }
            }
        });
    }
}
exports.default = AFKMonitor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vbml0b3JzL2Fmay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlFO0FBR3hFLE1BQXFCLFVBQVcsU0FBUSxlQUFPO0lBQzNDLFlBQVksTUFBbUIsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUNuRixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUI7O1lBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSztnQkFBRSxPQUFPO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQVUsQ0FBQztZQUM3RCxLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtnQkFDekIsSUFBSyxHQUFHLENBQUMsTUFBZSxDQUFDLEVBQUUsS0FBTSxJQUFZLENBQUMsRUFBRSxFQUFFO29CQUMvQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBTSxHQUFHLENBQUMsTUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNqRSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNqRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFpQixHQUFHLENBQUMsTUFBZSxDQUFDLFFBQVEsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO2lCQUN0RztxQkFBTSxJQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBOEMsQ0FBQyxHQUFHLENBQUUsSUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUM1RixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsSUFBWSxDQUFDLEVBQUUsQ0FBUyxDQUFDO29CQUM5RCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2xELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxrQ0FBa0MsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ3RGO2FBQ0o7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQXRCRCw2QkFzQkMifQ==