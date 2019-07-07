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
const discord_js_1 = require("discord.js");
const ms = require('ms');
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            aliases: ['modlogs'],
            usage: '[user:user]',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }
    run(msg, [user]) {
        return __awaiter(this, void 0, void 0, function* () {
            const cases = msg.guild.settings.get('modlogs.cases');
            if (user)
                cases.filter((c) => c.user === user.id);
            if (cases.length === 0)
                throw `No cases were found for this ${user ? 'user' : 'guild'}`;
            const display = new klasa_1.RichDisplay(new discord_js_1.MessageEmbed()
                .setTitle(`Modlogs for ${user ? user.tag : msg.guild.name}`)
                .setColor('#2f62b5')
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL()));
            for (let i = 0; i < cases.length; i++) {
                if (i % 10 === 0) {
                    const lst = cases.slice(i).slice(0, 10);
                    display.addPage((template) => {
                        lst.forEach((c) => template.addField(`${c.type} Case #${c.id}`, `${this.client.users.has(c.user) ? `${this.client.users.get(c.user).tag} ` : ''}\`${c.reason.slice(0, 200)}\``));
                        return template;
                    });
                }
            }
            display.run(yield msg.send('Loading modlogs...'));
            return null;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL01vZGVyYXRpb24vbW9kbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBMkc7QUFFM0csMkNBQTREO0FBQzVELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixlQUFxQixTQUFRLGVBQU87SUFFaEMsWUFBbUIsTUFBZ0IsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUN2RixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNwQixLQUFLLEVBQUUsYUFBYTtZQUNwQixtQkFBbUIsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUNyQyxlQUFlLEVBQUUsQ0FBQztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQWM7O1lBQ25ELE1BQU0sS0FBSyxHQUFJLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdEUsSUFBSSxJQUFJO2dCQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXZELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUFFLE1BQU0sZ0NBQWdDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV4RixNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFXLENBQUMsSUFBSSx5QkFBWSxFQUFFO2lCQUM3QyxRQUFRLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxLQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMzRSxRQUFRLENBQUMsU0FBUyxDQUFDO2lCQUNuQixTQUFTLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFtQixDQUFDLFFBQVEsRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQW1CLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFaEgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUU7b0JBQ2QsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBc0IsRUFBRSxFQUFFO3dCQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2hNLE9BQU8sUUFBUSxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQWlCLENBQUMsQ0FBQztZQUNsRSxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSjtBQW5DRCw0QkFtQ0MifQ==