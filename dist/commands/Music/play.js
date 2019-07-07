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
            usage: '<query:...str{0,250}>'
        });
    }
    run(msg, [query]) {
        return __awaiter(this, void 0, void 0, function* () {
            let audio = this.client.audio;
            if (!msg.member.voice.channel || !msg.member.voice.channel.members.has(this.client.user.id))
                return msg.send('join my vc');
            let video = yield audio.load(msg, query);
            if (!video)
                throw 'Could not load track';
            yield audio.loadTrack(msg, video[0]).catch(console.log);
            return null;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9NdXNpYy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBdUU7QUFLdkUsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsdUJBQXVCO1NBQ2pDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLEtBQUssQ0FBVzs7WUFDakQsSUFBSSxLQUFLLEdBQUksSUFBSSxDQUFDLE1BQW1CLENBQUMsS0FBSyxDQUFDO1lBQzVDLElBQUksQ0FBRSxHQUFHLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUcsR0FBRyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLE9BQXdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQW1CLENBQUMsRUFBRSxDQUFDO2dCQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUvTCxJQUFJLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLO2dCQUFFLE1BQU0sc0JBQXNCLENBQUM7WUFFekMsTUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKO0FBakJELDRCQWlCQyJ9