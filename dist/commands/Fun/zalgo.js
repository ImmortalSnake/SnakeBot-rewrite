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
const zalgo_json_1 = __importDefault(require("../../lib/Data/json/zalgo.json"));
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<text:...str{1,500}>',
        });
    }
    run(msg, [text]) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                result += text[i];
                for (const chars of Object.values(zalgo_json_1.default)) {
                    let count = Math.floor(Math.random() * 5);
                    while (count--)
                        result += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            return msg.sendMessage(result);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemFsZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvRnVuL3phbGdvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBNEQ7QUFFNUQsZ0ZBQW1EO0FBRW5ELGVBQXFCLFNBQVEsZUFBTztJQUNoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLHNCQUFzQjtTQUNoQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQVc7O1lBQ2hELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFLLENBQUMsRUFBRTtvQkFDdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLE9BQU8sS0FBSyxFQUFFO3dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQzdFO2FBQ0o7WUFDRCxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0NBQ0o7QUFsQkQsNEJBa0JDIn0=