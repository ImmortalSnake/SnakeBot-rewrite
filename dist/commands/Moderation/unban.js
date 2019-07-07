"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const LogHandler_1 = __importDefault(require("../../lib/utils/LogHandler"));
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            runIn: ['text'],
            usage: '<user:user> [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5
        });
    }
    run(msg, [user, reason = 'N/A']) {
        return __awaiter(this, void 0, void 0, function* () {
            yield msg.guild.members.unban(user.id).catch((e) => { throw e; });
            const data = {
                id: msg.guild.settings.get('modlogs.total'),
                moderator: msg.author.id,
                user: user.id,
                reason: reason,
                time: Date.now(),
                type: 'Unban'
            };
            msg.guild.settings.update('modlogs.cases', data, { action: 'add' });
            msg.guild.settings.update('modlogs.total', msg.guild.settings.get('modlogs.total') + 1);
            yield LogHandler_1.default(msg, data);
            return msg.sendMessage(`${user.toString()} was unbanned for reason **${reason}**`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5iYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvTW9kZXJhdGlvbi91bmJhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXdFO0FBR3hFLDRFQUFvRDtBQUVwRCxlQUFxQixTQUFRLGVBQU87SUFDaEMsWUFBbUIsTUFBZ0IsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUN2RixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNmLEtBQUssRUFBRSw2QkFBNkI7WUFDcEMsbUJBQW1CLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDcEMsZUFBZSxFQUFFLENBQUM7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLEdBQUcsQ0FBQyxHQUFpQixFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQWlCOztZQUN0RSxNQUFPLEdBQUcsQ0FBQyxLQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdFLE1BQU0sSUFBSSxHQUFHO2dCQUNULEVBQUUsRUFBRyxHQUFHLENBQUMsS0FBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztnQkFDM0QsU0FBUyxFQUFHLEdBQUcsQ0FBQyxNQUFlLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNiLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNoQixJQUFJLEVBQUUsT0FBTzthQUNoQixDQUFDO1lBRUQsR0FBRyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxHQUFHLENBQUMsS0FBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFHLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkgsTUFBTSxvQkFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU1QixPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLDhCQUE4QixNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7S0FBQTtDQUNKO0FBNUJELDRCQTRCQyJ9