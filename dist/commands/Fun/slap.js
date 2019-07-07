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
const slaps_1 = __importDefault(require("../../lib/Data/ts/slaps"));
const discord_js_1 = require("discord.js");
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<user:member>',
        });
    }
    run(msg, [member]) {
        return __awaiter(this, void 0, void 0, function* () {
            const gif = slaps_1.default[Math.floor(Math.random() * slaps_1.default.length)];
            return msg.sendEmbed(new discord_js_1.MessageEmbed()
                .setColor('ORANGE')
                .setImage(gif)
                .setTitle(`_**${msg.author.username}** slaps **${member.user.username}**._`));
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9GdW4vc2xhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTREO0FBRTVELG9FQUE0QztBQUM1QywyQ0FBNkQ7QUFFN0QsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsZUFBZTtTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQWdCOztZQUN2RCxNQUFNLEdBQUcsR0FBRyxlQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFNUQsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUkseUJBQVksRUFBRTtpQkFDbEMsUUFBUSxDQUFDLFFBQVEsQ0FBQztpQkFDbEIsUUFBUSxDQUFDLEdBQUcsQ0FBQztpQkFDYixRQUFRLENBQUMsTUFBTyxHQUFHLENBQUMsTUFBZSxDQUFDLFFBQVEsY0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNoRyxDQUFDO0tBQUE7Q0FDSjtBQWZELDRCQWVDIn0=