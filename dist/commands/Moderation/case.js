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
const ms = require('ms');
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<id:int>',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }
    run(msg, [ID]) {
        return __awaiter(this, void 0, void 0, function* () {
            const cases = msg.guild.settings.get('modlogs.cases');
            const Case = cases.find((c) => c.id === ID);
            if (!Case)
                return msg.sendMessage('Could not find a case with that ID');
            const mod = yield this.client.users.fetch(Case.moderator);
            const user = yield this.client.users.fetch(Case.user);
            const embed = this.client.embed(msg, {
                description: `Reason: \`${Case.reason}\``,
                title: `${Case.type} Case #${Case.id}`
            })
                .addField('Moderator', mod ? mod.tag : Case.moderator, true)
                .addField('Punished User', user ? user.tag : Case.user, true)
                .setFooter('At')
                .setTimestamp(Case.time);
            if (Case.duration)
                embed.addField('Duration', ms(Case.duration, { long: true }), true);
            return msg.sendEmbed(embed);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9Nb2RlcmF0aW9uL2Nhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFtRjtBQUVuRixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsZUFBcUIsU0FBUSxlQUFPO0lBRWhDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsVUFBVTtZQUNqQixtQkFBbUIsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUNyQyxlQUFlLEVBQUUsQ0FBQztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQVc7O1lBQzlDLE1BQU0sS0FBSyxHQUFJLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdEUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUVqRCxJQUFJLENBQUMsSUFBSTtnQkFBRSxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUV4RSxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRELE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxNQUFtQixDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQy9DLFdBQVcsRUFBRSxhQUFhLElBQUksQ0FBQyxNQUFNLElBQUk7Z0JBQ3pDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUUsRUFBRTthQUN6QyxDQUFDO2lCQUNELFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztpQkFDM0QsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2lCQUM1RCxTQUFTLENBQUMsSUFBSSxDQUFDO2lCQUNmLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekIsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZGLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO0tBQUE7Q0FDSjtBQS9CRCw0QkErQkMifQ==