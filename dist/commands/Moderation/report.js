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
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_GUILD']
        });
    }
    run(msg, [user, reason = 'N/A']) {
        return __awaiter(this, void 0, void 0, function* () {
            const reportschan = msg.guild.channels.get(msg.guild.settings.get('channels.reports')) || msg.guild.channels.find(c => c.name.toLowerCase() === 'reports');
            if (!reportschan)
                throw `Could not find a reports channel for this server`;
            msg.channel.send(this.client.embed(msg, { description: reason, title: 'Reports' })
                .addField('Reporter', msg.author.toString())
                .addField('Channel', msg.channel.toString())
                .addField('Reported User', user.toString()));
            yield msg.delete();
            return null;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL01vZGVyYXRpb24vcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBd0U7QUFJeEUsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsK0JBQStCO1lBQ3RDLG1CQUFtQixFQUFFLENBQUMsY0FBYyxDQUFDO1NBQ3hDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUF3Qjs7WUFDN0UsTUFBTSxXQUFXLEdBQUksR0FBRyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFLLEdBQUcsQ0FBQyxLQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssU0FBUyxDQUFDLENBQUM7WUFDak0sSUFBSSxDQUFDLFdBQVc7Z0JBQUUsTUFBTSxrREFBa0QsQ0FBQztZQUUzRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsTUFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7aUJBQzNGLFFBQVEsQ0FBQyxVQUFVLEVBQUcsR0FBRyxDQUFDLE1BQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDckQsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUMzQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFakQsTUFBTSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0o7QUFwQkQsNEJBb0JDIn0=