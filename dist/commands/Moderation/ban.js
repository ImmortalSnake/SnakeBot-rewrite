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
            usage: '<user:user> [reason:...str]',
            requiredPermissions: ['BAN_MEMBERS'],
            permissionLevel: 5
        });
    }
    run(msg, [user, reason = 'N/A']) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = msg.guild.members.get(user.id);
            if (member && member.permissions.has('MANAGE_GUILD'))
                return msg.sendMessage('Cannot ban this user');
            yield user.send(`You were banned from ${msg.guild.name} for reason:\n${reason}`).catch(console.log);
            yield msg.guild.members.ban(user.id, { reason: reason }).catch((e) => { throw e; });
            const data = {
                id: msg.guild.settings.get('modlogs.total'),
                moderator: msg.author.id,
                user: user.id,
                reason: reason,
                time: Date.now(),
                type: 'Ban'
            };
            msg.guild.settings.update('modlogs.cases', data, { action: 'add' });
            msg.guild.settings.update('modlogs.total', msg.guild.settings.get('modlogs.total') + 1);
            yield LogHandler_1.default(msg, data);
            return msg.sendMessage(`${user.toString()} was banned for reason **${reason}**`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL01vZGVyYXRpb24vYmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBd0U7QUFHeEUsNEVBQW9EO0FBRXBELGVBQXFCLFNBQVEsZUFBTztJQUNoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLDZCQUE2QjtZQUNwQyxtQkFBbUIsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUNwQyxlQUFlLEVBQUUsQ0FBQztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUssQ0FBaUI7O1lBQ3RFLE1BQU0sTUFBTSxHQUFJLEdBQUcsQ0FBQyxLQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekQsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO2dCQUFFLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRXJHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBeUIsR0FBRyxDQUFDLEtBQWUsQ0FBQyxJQUFJLGlCQUFpQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0csTUFBTyxHQUFHLENBQUMsS0FBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvRixNQUFNLElBQUksR0FBRztnQkFDVCxFQUFFLEVBQUcsR0FBRyxDQUFDLEtBQW9CLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7Z0JBQzNELFNBQVMsRUFBRyxHQUFHLENBQUMsTUFBZSxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDYixNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDO1lBRUQsR0FBRyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxHQUFHLENBQUMsS0FBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFHLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkgsTUFBTSxvQkFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU1QixPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLDRCQUE0QixNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ3JGLENBQUM7S0FBQTtDQUNKO0FBL0JELDRCQStCQyJ9