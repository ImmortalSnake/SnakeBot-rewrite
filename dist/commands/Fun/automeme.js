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
            usage: '[minutes:int{15,}]',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 6
        });
    }
    run(msg, [minutes]) {
        return __awaiter(this, void 0, void 0, function* () {
            const automeme = msg.guild.settings.get('automeme');
            if (automeme.enabled) {
                yield msg.guild.settings.update('automeme.enabled', false);
                return msg.send('Disabled Automemes for the server!');
            }
            if (!minutes)
                return msg.sendMessage('Enter number of minutes');
            yield msg.guild.settings.update('automeme.enabled', true);
            yield msg.guild.settings.update('automeme.limit', minutes);
            yield msg.guild.settings.update('automeme.channel', msg.channel.id);
            yield this.client.schedule.create('automeme', minutes * 60 * 1000, {
                data: { channel: msg.channel.id }
            });
            return msg.send('Automemes have been enabled');
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b21lbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvRnVuL2F1dG9tZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBd0U7QUFHeEUsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLG1CQUFtQixFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDeEMsZUFBZSxFQUFFLENBQUM7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLEdBQUcsQ0FBQyxHQUFpQixFQUFFLENBQUMsT0FBTyxDQUFXOztZQUNuRCxNQUFNLFFBQVEsR0FBSSxHQUFHLENBQUMsS0FBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXBFLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDbEIsTUFBTyxHQUFHLENBQUMsS0FBb0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMzRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQzthQUN6RDtZQUVELElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2hFLE1BQU8sR0FBRyxDQUFDLEtBQW9CLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRSxNQUFPLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0UsTUFBTyxHQUFHLENBQUMsS0FBb0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEYsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFO2dCQUMvRCxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7YUFDcEMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0NBQ0o7QUEzQkQsNEJBMkJDIn0=