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
const connect4_1 = __importDefault(require("../../lib/Games/connect4"));
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
            let players = [];
            if (opp) {
                players = [msg.author.id, opp.id];
                yield msg.channel.send(`${opp.toString()}, Do you confirm to play? (y/n)`);
                const responses = yield msg.channel.awaitMessages(m => m.author.id === opp.id, { time: 30000, max: 1 });
                if (responses.size === 0)
                    throw 'Challenge Request Timeout!';
                if (responses.first().content.toLowerCase() === 'n')
                    throw 'Challenge was rejected';
            }
            else {
                let start = yield msg.prompt('Do you want to start first? (y/n)')
                    .then(m => m.content.toLowerCase())
                    .catch();
                if (start === 'y')
                    players = [msg.author.id, this.client.user.id];
                else
                    players = [this.client.user.id, msg.author.id];
            }
            const game = new connect4_1.default(this.client, msg, players);
            const res = yield game.run(msg);
            return null;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdDQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvR2FtZXMvY29ubmVjdDQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF1RTtBQUV2RSx3RUFBZ0Q7QUFHaEQsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLFFBQVEsRUFBRSxFQUFFO1lBQ1osYUFBYSxFQUFFLFNBQVM7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLEdBQUcsQ0FBQyxHQUFpQixFQUFFLENBQUMsR0FBRyxDQUFnQjs7WUFFcEQsSUFBSSxPQUFPLEdBQUcsRUFBYyxDQUFDO1lBRTdCLElBQUksR0FBRyxFQUFFO2dCQUNMLE9BQU8sR0FBRyxDQUFFLEdBQUcsQ0FBQyxNQUFvQixDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pELE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7Z0JBQzNFLE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFeEcsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUM7b0JBQUUsTUFBTSw0QkFBNEIsQ0FBQztnQkFDN0QsSUFBSyxTQUFTLENBQUMsS0FBSyxFQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLEdBQUc7b0JBQUUsTUFBTSx3QkFBd0IsQ0FBQzthQUNwRztpQkFBTTtnQkFDSCxJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUNBQW1DLENBQUM7cUJBQ2hFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ2xDLEtBQUssRUFBRSxDQUFDO2dCQUVULElBQUksS0FBSyxLQUFLLEdBQUc7b0JBQUUsT0FBTyxHQUFHLENBQUUsR0FBRyxDQUFDLE1BQW9CLENBQUMsRUFBRSxFQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7b0JBQzVGLE9BQU8sR0FBRyxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBbUIsQ0FBQyxFQUFFLEVBQUcsR0FBRyxDQUFDLE1BQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEY7WUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLGtCQUFRLENBQUMsSUFBSSxDQUFDLE1BQWtCLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUdoQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSjtBQW5DRCw0QkFtQ0MifQ==