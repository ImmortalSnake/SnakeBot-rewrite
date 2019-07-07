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
            usage: '[member:member]',
        });
        this.timestamp = new klasa_1.Timestamp('d MMMM YYYY');
    }
    run(msg, [member]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!member)
                member = msg.member;
            const Embed = this.client.embed(msg, {
                thumbnail: member.user.displayAvatarURL(),
                title: `**${member.user.username}**`,
                color: member.displayHexColor
            })
                .addField('❯ Name', member.displayName, true)
                .addField('❯ ID', member.id, true)
                .addField('❯ Discord Join Date', this.timestamp.display(member.user.createdAt), true)
                .addField('❯ Server Join Date', this.timestamp.display(member.joinedTimestamp), true)
                .addField('❯ Playing', member.presence.activity ? member.presence.activity.name : 'N/A', true)
                .addField('❯ Highest Role', member.roles.size > 1 ? member.roles.highest.name : 'None', true)
                .addField('❯ Bot?', member.user.bot ? 'Yes' : 'No', true);
            return msg.sendEmbed(Embed);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9VdGlsaXR5L3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFrRjtBQUlsRixlQUFxQixTQUFRLGVBQU87SUFHaEMsWUFBWSxNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ2hGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLGlCQUFpQjtTQUMzQixDQUFDLENBQUM7UUFMQSxjQUFTLEdBQUcsSUFBSSxpQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBTWhELENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBZ0I7O1lBQ3ZELElBQUksQ0FBQyxNQUFNO2dCQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBcUIsQ0FBQztZQUNoRCxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsTUFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUMvQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekMsS0FBSyxFQUFFLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUk7Z0JBQ3BDLEtBQUssRUFBRSxNQUFNLENBQUMsZUFBZTthQUNoQyxDQUFDO2lCQUNELFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7aUJBQzVDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7aUJBQ2pDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQztpQkFDcEYsUUFBUSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUF5QixDQUFDLEVBQUUsSUFBSSxDQUFDO2lCQUM5RixRQUFRLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7aUJBQzdGLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztpQkFDNUYsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFMUQsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FBQTtDQUNKO0FBMUJELDRCQTBCQyJ9