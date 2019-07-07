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
            usage: '[user:user]',
        });
    }
    run(msg, [user]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user)
                user = msg.author;
            const Embed = this.client.embed(msg, {
                image: user.displayAvatarURL(),
                title: `**${user.username}**`
            });
            return msg.sendEmbed(Embed);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL1V0aWxpdHkvYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBdUU7QUFHdkUsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsYUFBYTtTQUN2QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQWM7O1lBQ25ELElBQUksQ0FBQyxJQUFJO2dCQUFFLElBQUksR0FBRyxHQUFHLENBQUMsTUFBbUIsQ0FBQztZQUMxQyxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsTUFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUMvQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUM5QixLQUFLLEVBQUUsS0FBSyxJQUFJLENBQUMsUUFBUSxJQUFJO2FBQ2hDLENBQUMsQ0FBQztZQUVILE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO0tBQUE7Q0FDSjtBQWhCRCw0QkFnQkMifQ==