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
            usage: '<text:str{1,100}>'
        });
    }
    run(msg, [text]) {
        return __awaiter(this, void 0, void 0, function* () {
            return new ImageHandler_1.default()
                .ytImage(msg, text).then((res) => {
                return msg.send({
                    files: [{
                            attachment: res.body,
                            name: 'youtube.png',
                        }]
                }).catch(() => {
                    throw 'An error Occured! Try again later';
                });
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9JbWFnZXMveW91dHViZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTREO0FBRTVELGdGQUF3RDtBQUV4RCxlQUFxQixTQUFRLGVBQU87SUFDaEMsWUFBbUIsTUFBZ0IsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUN2RixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLFFBQVEsRUFBRSxFQUFFO1lBQ1osS0FBSyxFQUFFLG1CQUFtQjtTQUM3QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQVc7O1lBQ2hELE9BQU8sSUFBSSxzQkFBWSxFQUFFO2lCQUNwQixPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUM3QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ1osS0FBSyxFQUFFLENBQUM7NEJBQ0osVUFBVSxFQUFFLEdBQUcsQ0FBQyxJQUFJOzRCQUNwQixJQUFJLEVBQUUsYUFBYTt5QkFDdEIsQ0FBQztpQkFDTCxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtvQkFDVixNQUFNLG1DQUFtQyxDQUFDO2dCQUM5QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztLQUFBO0NBQ0o7QUFyQkQsNEJBcUJDIn0=