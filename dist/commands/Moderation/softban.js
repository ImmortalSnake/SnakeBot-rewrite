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
            usage: '<user:user> [days:int{1,7}] [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5
        });
    }
    run(msg, [user, days = 7, reason = 'N/A']) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = msg.guild.members.get(user.id);
            if (member) {
                if (member.permissions.has('MANAGE_GUILD'))
                    throw 'You cannot ban this user';
                else if (!member.bannable)
                    throw 'Could not ban this user';
            }
            yield user.send(`You were banned from ${msg.guild.name} for reason:\n${reason}`).catch(console.log);
            yield msg.guild.members.ban(user.id, { reason: reason, days }).catch((e) => { throw e; });
            yield msg.guild.members.unban(user.id, `Softban Released`);
            const data = {
                id: msg.guild.settings.get('modlogs.total'),
                moderator: msg.author.id,
                user: user.id,
                reason: reason,
                time: Date.now(),
                type: 'Softban',
                duration: days * 86400000
            };
            msg.guild.settings.update('modlogs.cases', data, { action: 'add' });
            msg.guild.settings.update('modlogs.total', msg.guild.settings.get('modlogs.total') + 1);
            yield LogHandler_1.default(msg, data);
            return msg.sendMessage(`${user.toString()} was softbanned for reason **${reason}**`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29mdGJhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9Nb2RlcmF0aW9uL3NvZnRiYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF3RTtBQUd4RSw0RUFBb0Q7QUFFcEQsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsNkNBQTZDO1lBQ3BELG1CQUFtQixFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ3BDLGVBQWUsRUFBRSxDQUFDO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQXlCOztZQUN4RixNQUFNLE1BQU0sR0FBSSxHQUFHLENBQUMsS0FBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO29CQUFFLE1BQU0sMEJBQTBCLENBQUM7cUJBQ3hFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtvQkFBRSxNQUFNLHlCQUF5QixDQUFDO2FBQzlEO1lBRUQsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF5QixHQUFHLENBQUMsS0FBZSxDQUFDLElBQUksaUJBQWlCLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvRyxNQUFPLEdBQUcsQ0FBQyxLQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRyxNQUFPLEdBQUcsQ0FBQyxLQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFFdEUsTUFBTSxJQUFJLEdBQUc7Z0JBQ1QsRUFBRSxFQUFHLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2dCQUMzRCxTQUFTLEVBQUcsR0FBRyxDQUFDLE1BQWUsQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJLEdBQUcsUUFBUTthQUM1QixDQUFDO1lBRUQsR0FBRyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxHQUFHLENBQUMsS0FBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFHLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkgsTUFBTSxvQkFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU1QixPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLGdDQUFnQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ3pGLENBQUM7S0FBQTtDQUNKO0FBcENELDRCQW9DQyJ9