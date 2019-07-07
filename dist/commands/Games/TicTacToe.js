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
const tictactoe_1 = __importDefault(require("../../lib/Games/tictactoe"));
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '[opponent:member]',
            cooldown: 60,
            cooldownLevel: 'channel'
        });
    }
    run(msg, [opp]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (opp && opp.id === msg.author.id)
                return msg.sendMessage('You cant play against yourself');
            if (opp) {
                yield msg.channel.send(`${opp.toString()}, Do you confirm to play? (y/n)`);
                const responses = yield msg.channel.awaitMessages(m => m.author.id === opp.id, { time: 30000, max: 1 });
                if (responses.size === 0)
                    throw 'Challenge Request Timeout!';
                if (responses.first().content.toLowerCase() === 'n')
                    throw 'Challenge was rejected';
            }
            const game = new tictactoe_1.default(this.client, opp ? false : true);
            const res = yield game.play(msg, [msg.author.id,
                opp ? opp.user.id : this.client.user.id]);
            yield msg.channel.send(res);
            return null;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljdGFjdG9lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0dhbWVzL3RpY3RhY3RvZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXVFO0FBRXZFLDBFQUFrRDtBQUdsRCxlQUFxQixTQUFRLGVBQU87SUFDaEMsWUFBbUIsTUFBZ0IsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUN2RixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsUUFBUSxFQUFFLEVBQUU7WUFDWixhQUFhLEVBQUUsU0FBUztTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxHQUFHLENBQWdCOztZQUNwRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxLQUFNLEdBQUcsQ0FBQyxNQUFvQixDQUFDLEVBQUU7Z0JBQUUsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDN0csSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztnQkFDM0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUV4RyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssQ0FBQztvQkFBRSxNQUFNLDRCQUE0QixDQUFDO2dCQUM3RCxJQUFLLFNBQVMsQ0FBQyxLQUFLLEVBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRztvQkFBRSxNQUFNLHdCQUF3QixDQUFDO2FBQ3BHO1lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQzNCLENBQUUsR0FBRyxDQUFDLE1BQW9CLENBQUMsRUFBRTtnQkFDekIsR0FBRyxDQUFDLENBQUMsQ0FBRSxHQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRW5GLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0o7QUEzQkQsNEJBMkJDIn0=