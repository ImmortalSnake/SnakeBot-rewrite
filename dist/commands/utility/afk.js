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
            usage: '<reason:...str>',
            requiredPermissions: ['MANAGE_NICKNAMES', 'MANAGE_MESSAGES'],
            cooldown: 10
        });
    }
    run(msg, [reason]) {
        return __awaiter(this, void 0, void 0, function* () {
            msg.guild.settings.update('afkusers', {
                id: msg.author.id,
                reason
            });
            return msg.sendMessage(`${msg.author.toString()} has  been set to AFK for reason: **${reason}**`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL1V0aWxpdHkvYWZrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBbUY7QUFHbkYsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLG1CQUFtQixFQUFFLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUM7WUFDNUQsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQVc7O1lBQ2pELEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO2dCQUNsRCxFQUFFLEVBQUcsR0FBRyxDQUFDLE1BQW9CLENBQUMsRUFBRTtnQkFDaEMsTUFBTTthQUNULENBQUMsQ0FBQztZQUVILE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFJLEdBQUcsQ0FBQyxNQUFvQixDQUFDLFFBQVEsRUFBRSx1Q0FBdUMsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUNySCxDQUFDO0tBQUE7Q0FDSjtBQWpCRCw0QkFpQkMifQ==