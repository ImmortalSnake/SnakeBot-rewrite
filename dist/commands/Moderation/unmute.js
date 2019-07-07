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
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5
        });
    }
    run(msg, [member, reason = 'N/A']) {
        return __awaiter(this, void 0, void 0, function* () {
            let muteRole = msg.guild.roles.get(msg.guild.settings.get('roles.muted')) || msg.guild.roles.find(r => r.name.toLowerCase() === 'muted');
            if (!muteRole)
                throw `A mute role was not found for this guild`;
            if (!member.roles.has(muteRole.id))
                throw 'The member is not muted';
            yield member.roles.remove(muteRole.id).catch((e) => { throw e; });
            const data = {
                id: msg.guild.settings.get('modlogs.total'),
                moderator: msg.author.id,
                user: member.id,
                reason: reason,
                time: Date.now(),
                type: 'Unmute'
            };
            msg.guild.settings.update('modlogs.cases', data, { action: 'add' });
            msg.guild.settings.update('modlogs.total', msg.guild.settings.get('modlogs.total') + 1);
            yield LogHandler_1.default(msg, data);
            return msg.sendMessage(`${member.toString()} was unmuted. With reason of: ${reason}`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5tdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL01vZGVyYXRpb24vdW5tdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBa0Y7QUFHbEYsNEVBQW9EO0FBRXBELGVBQXFCLFNBQVEsZUFBTztJQUNoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2YsS0FBSyxFQUFFLCtCQUErQjtZQUN0QyxtQkFBbUIsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUNyQyxlQUFlLEVBQUUsQ0FBQztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLEtBQUssQ0FBd0I7O1lBQy9FLElBQUksUUFBUSxHQUFJLEdBQUcsQ0FBQyxLQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUMsS0FBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUssR0FBRyxDQUFDLEtBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUUvSyxJQUFJLENBQUMsUUFBUTtnQkFBRSxNQUFNLDBDQUEwQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUFFLE1BQU0seUJBQXlCLENBQUM7WUFFcEUsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWxFLE1BQU0sSUFBSSxHQUFHO2dCQUNULEVBQUUsRUFBRyxHQUFHLENBQUMsS0FBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztnQkFDM0QsU0FBUyxFQUFHLEdBQUcsQ0FBQyxNQUFlLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNmLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNoQixJQUFJLEVBQUUsUUFBUTthQUNqQixDQUFDO1lBRUQsR0FBRyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxHQUFHLENBQUMsS0FBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFHLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkgsTUFBTSxvQkFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU1QixPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLGlDQUFpQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzFGLENBQUM7S0FBQTtDQUNKO0FBakNELDRCQWlDQyJ9