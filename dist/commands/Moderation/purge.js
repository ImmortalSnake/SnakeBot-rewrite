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
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<limit:int{1,99}> [link|invite|bots|you|me|upload|user:user]',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 4
        });
    }
    run(msg, [limit = 5, filter = null]) {
        return __awaiter(this, void 0, void 0, function* () {
            let messages = yield msg.channel.messages.fetch({ limit: 100 });
            if (messages.size < 1)
                throw 'No messages were found!';
            if (filter) {
                const user = typeof filter !== 'string' ? filter : null;
                const type = typeof filter === 'string' ? filter : 'user';
                messages = messages.filter(this.getFilter(msg, type, user));
            }
            messages = messages.array().slice(0, limit);
            const deleted = yield msg.channel.bulkDelete(messages);
            msg.channel.send(`**:wastebasket: Deleted ${deleted.size} messages!**`).then(m => m.delete());
            return null;
        });
    }
    getFilter(msg, filter, user) {
        switch (filter) {
            case 'link': return (mes) => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content);
            case 'invite': return (mes) => /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(mes.content);
            case 'bots': return (mes) => mes.author.bot;
            case 'you': return (mes) => mes.author.id === this.client.user.id;
            case 'me': return (mes) => mes.author.id === msg.author.id;
            case 'upload': return (mes) => mes.attachments.size > 0;
            case 'user': return (mes) => mes.author.id === user.id;
            default: return (mes) => true;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvTW9kZXJhdGlvbi9wdXJnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTREO0FBSzVELGVBQXFCLFNBQVEsZUFBTztJQUVoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLDhEQUE4RDtZQUNyRSxtQkFBbUIsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ3hDLGVBQWUsRUFBRSxDQUFDO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBZ0I7O1lBQ3pFLElBQUksUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUM7Z0JBQUUsTUFBTSx5QkFBeUIsQ0FBQztZQUN2RCxJQUFJLE1BQU0sRUFBRTtnQkFDUixNQUFNLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN4RCxNQUFNLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUMxRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFRLENBQUMsQ0FBQzthQUN0RTtZQUNELFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQVEsQ0FBQztZQUVuRCxNQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZELEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixPQUFPLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMzRyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFTyxTQUFTLENBQUMsR0FBaUIsRUFBRSxNQUFjLEVBQUUsSUFBVTtRQUMzRCxRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQWlCLEVBQUUsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0YsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBaUIsRUFBRSxFQUFFLENBQUMsNEVBQTRFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1SSxLQUFLLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFpQixFQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsTUFBZSxDQUFDLEdBQUcsQ0FBQztZQUNwRSxLQUFLLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFpQixFQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsTUFBZSxDQUFDLEVBQUUsS0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQW1CLENBQUMsRUFBRSxDQUFDO1lBQzFHLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQWlCLEVBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxNQUFlLENBQUMsRUFBRSxLQUFNLEdBQUcsQ0FBQyxNQUFlLENBQUMsRUFBRSxDQUFDO1lBQzdGLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQWlCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUN0RSxLQUFLLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFpQixFQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsTUFBZSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQy9FLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDL0M7SUFDTCxDQUFDO0NBQ0o7QUFyQ0QsNEJBcUNDIn0=