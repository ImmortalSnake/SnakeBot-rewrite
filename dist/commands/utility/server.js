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
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            aliases: ['server-info', 'serverinfo']
        });
        this.timestamp = new klasa_1.Timestamp('d MMMM YYYY');
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = msg.guild;
            return msg.sendEmbed(new discord_js_1.MessageEmbed()
                .setDescription('**Server Information**')
                .setColor('#15f153')
                .setThumbnail(server.icon)
                .addField('❯ Server Name', server.name, true)
                .addField('❯ Total Members', server.memberCount, true)
                .addField('❯ Region', server.region, true)
                .addField('❯ Owner', server.owner.toString(), true)
                .addField('❯ Channels', server.channels.size, true)
                .addField('❯ Emojis', server.emojis.size, true)
                .addField('❯ Created At', this.timestamp.display(server.createdAt), true)
                .addField('❯ Joined At', this.timestamp.display(msg.member.joinedAt), true)
                .addField('❯ Roles (' + server.roles.size + ')', server.roles.map(r => r).join(''), true));
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL1V0aWxpdHkvc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBOEY7QUFFOUYsMkNBQXVEO0FBRXZELGVBQXFCLFNBQVEsZUFBTztJQUdoQyxZQUFZLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDaEYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxPQUFPLEVBQUcsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO1NBQzFDLENBQUMsQ0FBQztRQUxBLGNBQVMsR0FBRyxJQUFJLGlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7SUFNaEQsQ0FBQztJQUVZLEdBQUcsQ0FBQyxHQUFpQjs7WUFDOUIsTUFBTSxNQUFNLEdBQUksR0FBRyxDQUFDLEtBQW9CLENBQUM7WUFDekMsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUkseUJBQVksRUFBRTtpQkFDbEMsY0FBYyxDQUFDLHdCQUF3QixDQUFDO2lCQUN4QyxRQUFRLENBQUMsU0FBUyxDQUFDO2lCQUNuQixZQUFZLENBQUMsTUFBTSxDQUFDLElBQWMsQ0FBQztpQkFDbkMsUUFBUSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztpQkFDNUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDO2lCQUNyRCxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO2lCQUN6QyxRQUFRLENBQUMsU0FBUyxFQUFHLE1BQU0sQ0FBQyxLQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQztpQkFDbkUsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7aUJBQ2xELFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2lCQUM5QyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUM7aUJBQ3hFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUUsR0FBRyxDQUFDLE1BQXNCLENBQUMsUUFBZ0IsQ0FBQyxFQUFFLElBQUksQ0FBQztpQkFDbkcsUUFBUSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRyxDQUFDO0tBQUE7Q0FDSjtBQXpCRCw0QkF5QkMifQ==