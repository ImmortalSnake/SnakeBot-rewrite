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
const quotes_json_1 = __importDefault(require("../../lib/Data/json/quotes.json"));
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<question:...str>',
        });
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const quote = quotes_json_1.default[Math.floor(Math.random() * quotes_json_1.default.length)];
            return msg.sendMessage(`${quote.quote} - _${quote.author}_`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvRnVuL3F1b3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBNEQ7QUFFNUQsa0ZBQXFEO0FBRXJELGVBQXFCLFNBQVEsZUFBTztJQUNoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLG1CQUFtQjtTQUM3QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCOztZQUM5QixNQUFNLEtBQUssR0FBRyxxQkFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLHFCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoRSxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7S0FBQTtDQUNKO0FBWEQsNEJBV0MifQ==