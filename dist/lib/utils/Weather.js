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
const node_fetch_1 = __importDefault(require("node-fetch"));
class WeatherHandler {
    constructor() {
        this.url = 'http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=';
    }
    find({ query, degree = 'F', language = 'en-US' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.url}${degree}&culture=${language}&weasearchstr=${query}`;
            return node_fetch_1.default(url).then(res => {
                return res;
            });
        });
    }
}
exports.default = WeatherHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2VhdGhlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvV2VhdGhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsNERBQStCO0FBUS9CLE1BQXFCLGNBQWM7SUFBbkM7UUFDVyxRQUFHLEdBQUcscUVBQXFFLENBQUM7SUFRdkYsQ0FBQztJQU5nQixJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxHQUFHLEdBQUcsRUFBRSxRQUFRLEdBQUcsT0FBTyxFQUFrQjs7WUFDekUsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sWUFBWSxRQUFRLGlCQUFpQixLQUFLLEVBQUUsQ0FBQztZQUM3RSxPQUFPLG9CQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixPQUFPLEdBQUcsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0o7QUFURCxpQ0FTQyJ9