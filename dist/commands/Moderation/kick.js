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
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['KICK_MEMBERS'],
            permissionLevel: 5
        });
    }
    run(msg, [user, reason = 'N/A']) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user && user.permissions.has('MANAGE_GUILD'))
                return msg.sendMessage('Cannot kick this user');
            yield user.send(`You were kicked from ${msg.guild.name} for reason:\n${reason}`).catch(console.log);
            yield user.kick(reason).catch((e) => { throw e; });
            const data = {
                id: msg.guild.settings.get('modlogs.total'),
                moderator: msg.author.id,
                user: user.id,
                reason: reason,
                time: Date.now(),
                type: 'Kick'
            };
            msg.guild.settings.update('modlogs.cases', data, { action: 'add' });
            msg.guild.settings.update('modlogs.total', msg.guild.settings.get('modlogs.total') + 1);
            yield LogHandler_1.default(msg, data);
            return msg.sendMessage(`${user.toString()} was banned for reason **${reason}**`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9Nb2RlcmF0aW9uL2tpY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF3RTtBQUd4RSw0RUFBb0Q7QUFFcEQsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDZixLQUFLLEVBQUUsK0JBQStCO1lBQ3RDLG1CQUFtQixFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3JDLGVBQWUsRUFBRSxDQUFDO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUF3Qjs7WUFDN0UsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO2dCQUFFLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRWxHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBeUIsR0FBRyxDQUFDLEtBQWUsQ0FBQyxJQUFJLGlCQUFpQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0csTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRCxNQUFNLElBQUksR0FBRztnQkFDVCxFQUFFLEVBQUcsR0FBRyxDQUFDLEtBQW9CLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7Z0JBQzNELFNBQVMsRUFBRyxHQUFHLENBQUMsTUFBZSxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDYixNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDO1lBRUQsR0FBRyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxHQUFHLENBQUMsS0FBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFHLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkgsTUFBTSxvQkFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU1QixPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLDRCQUE0QixNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ3JGLENBQUM7S0FBQTtDQUNKO0FBL0JELDRCQStCQyJ9