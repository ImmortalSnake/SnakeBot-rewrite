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
        super(client, store, file, directory, {});
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let audio = this.client.audio;
            if (!msg.member.voice.channel)
                return msg.send('not in vc');
            return audio.join(msg.member.voice.channel)
                .then(() => {
                return msg.sendMessage('Successfully joined your Voice Channel!');
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9NdXNpYy9qb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBdUU7QUFLdkUsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNyQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCOztZQUM5QixJQUFJLEtBQUssR0FBSSxJQUFJLENBQUMsTUFBbUIsQ0FBQyxLQUFLLENBQUM7WUFFNUMsSUFBSSxDQUFFLEdBQUcsQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxPQUFPO2dCQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3RSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLE9BQXVCLENBQUM7aUJBQ3ZFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO0tBQUE7Q0FDSjtBQWZELDRCQWVDIn0=