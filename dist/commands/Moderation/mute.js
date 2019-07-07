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
            usage: '<user:member> [duration:time] [reason:...str]',
            requiredPermissions: ['MANAGE_ROLES'],
            permissionLevel: 5
        });
    }
    run(msg, [member, duration, reason = 'N/A']) {
        return __awaiter(this, void 0, void 0, function* () {
            let muteRole = msg.guild.roles.get(msg.guild.settings.get('roles.muted')) || msg.guild.roles.find(r => r.name.toLowerCase() === 'muted');
            if (!muteRole)
                throw `A mute role was not found for this guild`;
            if (member.roles.highest.position >= msg.member.roles.highest.position && !msg.hasAtLeastPermissionLevel(7))
                throw 'You cannot mute this user.';
            if (member.roles.has(muteRole.id))
                throw 'The member is already muted.';
            yield member.roles.add(muteRole.id).catch((e) => { throw e; });
            const data = {
                id: msg.guild.settings.get('modlogs.total'),
                moderator: msg.author.id,
                user: member.id,
                reason: reason,
                time: Date.now(),
                type: 'Mute',
                duration: duration - Date.now()
            };
            msg.guild.settings.update('modlogs.cases', data, { action: 'add' });
            msg.guild.settings.update('modlogs.total', msg.guild.settings.get('modlogs.total') + 1);
            yield LogHandler_1.default(msg, data);
            if (duration) {
                yield this.client.schedule.create('unmute', duration, {
                    data: {
                        guild: msg.guild.id,
                        user: member.id
                    }
                });
                return msg.sendMessage(`${member.user.tag} got temporarily muted for ${klasa_1.Duration.toNow(duration)}.${reason ? ` With reason of: ${reason}` : ''}`);
            }
            return msg.sendMessage(`${member.toString()} was muted.${reason ? ` With reason of: ${reason}` : ''}`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9Nb2RlcmF0aW9uL211dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFrRjtBQUdsRiw0RUFBb0Q7QUFFcEQsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDZixLQUFLLEVBQUUsK0NBQStDO1lBQ3RELG1CQUFtQixFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3JDLGVBQWUsRUFBRSxDQUFDO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxHQUFHLEtBQUssQ0FBNkI7O1lBQzlGLElBQUksUUFBUSxHQUFJLEdBQUcsQ0FBQyxLQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUMsS0FBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUssR0FBRyxDQUFDLEtBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUUvSyxJQUFJLENBQUMsUUFBUTtnQkFBRSxNQUFNLDBDQUEwQyxDQUFDO1lBQ2hFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFLLEdBQUcsQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztnQkFBRSxNQUFNLDRCQUE0QixDQUFDO1lBQ2pLLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFBRSxNQUFNLDhCQUE4QixDQUFDO1lBRXhFLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvRCxNQUFNLElBQUksR0FBRztnQkFDVCxFQUFFLEVBQUcsR0FBRyxDQUFDLEtBQW9CLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7Z0JBQzNELFNBQVMsRUFBRyxHQUFHLENBQUMsTUFBZSxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDZixNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO2FBQ2xDLENBQUM7WUFFRCxHQUFHLENBQUMsS0FBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLEdBQUcsQ0FBQyxLQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUcsR0FBRyxDQUFDLEtBQW9CLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuSCxNQUFNLG9CQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTVCLElBQUksUUFBUSxFQUFFO2dCQUNWLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7b0JBQ2xELElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUcsR0FBRyxDQUFDLEtBQWUsQ0FBQyxFQUFFO3dCQUM5QixJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUU7cUJBQ2xCO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsOEJBQThCLGdCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3BKO1lBRUQsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNHLENBQUM7S0FBQTtDQUNKO0FBN0NELDRCQTZDQyJ9