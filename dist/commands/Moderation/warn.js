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
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }
    run(msg, [user, reason = 'N/A']) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user.send(`You were warned in ${msg.guild.name} for: ${reason}`).catch(console.log);
            const data = {
                id: msg.guild.settings.get('modlogs.total'),
                moderator: msg.author.id,
                user: user.id,
                reason: reason,
                time: Date.now(),
                type: 'Warn'
            };
            msg.guild.settings.update('modlogs.cases', data, { action: 'add' });
            msg.guild.settings.update('modlogs.total', msg.guild.settings.get('modlogs.total') + 1);
            yield LogHandler_1.default(msg, data);
            return msg.sendMessage(`${user.toString()} was warned!`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Fybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9Nb2RlcmF0aW9uL3dhcm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF3RTtBQUd4RSw0RUFBb0Q7QUFFcEQsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsK0JBQStCO1lBQ3RDLG1CQUFtQixFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3JDLGVBQWUsRUFBRSxDQUFDO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUF3Qjs7WUFDN0UsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUF1QixHQUFHLENBQUMsS0FBZSxDQUFDLElBQUksU0FBUyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFckcsTUFBTSxJQUFJLEdBQUc7Z0JBQ1QsRUFBRSxFQUFHLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2dCQUMzRCxTQUFTLEVBQUcsR0FBRyxDQUFDLE1BQWUsQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQztZQUVELEdBQUcsQ0FBQyxLQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDOUUsR0FBRyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRyxHQUFHLENBQUMsS0FBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ILE1BQU0sb0JBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFNUIsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM3RCxDQUFDO0tBQUE7Q0FDSjtBQTNCRCw0QkEyQkMifQ==