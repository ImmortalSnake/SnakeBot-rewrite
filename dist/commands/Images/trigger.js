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
const ImageHandler_1 = __importDefault(require("../../lib/utils/ImageHandler"));
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            cooldown: 10,
            aliases: ['triggered'],
            usage: '[user:user]'
        });
    }
    run(msg, [user]) {
        return __awaiter(this, void 0, void 0, function* () {
            return new ImageHandler_1.default()
                .triggerImage(msg, user || msg.author).then((res) => {
                return msg.send({
                    files: [{
                            attachment: res.body,
                            name: 'trigger.png'
                        }]
                }).catch(() => {
                    throw 'An error Occured! Try again later';
                });
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9JbWFnZXMvdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXVFO0FBRXZFLGdGQUF3RDtBQUV4RCxlQUFxQixTQUFRLGVBQU87SUFDaEMsWUFBbUIsTUFBZ0IsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUN2RixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLEtBQUssRUFBRSxhQUFhO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLElBQUksQ0FBYzs7WUFDbkQsT0FBTyxJQUFJLHNCQUFZLEVBQUU7aUJBQ3BCLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDaEQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNaLEtBQUssRUFBRSxDQUFDOzRCQUNKLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSTs0QkFDcEIsSUFBSSxFQUFFLGFBQWE7eUJBQ3RCLENBQUM7aUJBQ0wsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7b0JBQ1YsTUFBTSxtQ0FBbUMsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7S0FBQTtDQUNKO0FBdEJELDRCQXNCQyJ9