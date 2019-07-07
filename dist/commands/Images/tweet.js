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
                .tweetImage(msg, text).then((res) => {
                return msg.send({
                    files: [{
                            attachment: res.body,
                            name: 'tweet.png'
                        }]
                }).catch(() => {
                    throw 'An error Occured! Try again later';
                });
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvSW1hZ2VzL3R3ZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBNEQ7QUFFNUQsZ0ZBQXdEO0FBRXhELGVBQXFCLFNBQVEsZUFBTztJQUNoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsUUFBUSxFQUFFLEVBQUU7WUFDWixLQUFLLEVBQUUsbUJBQW1CO1NBQzdCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLElBQUksQ0FBVzs7WUFDaEQsT0FBTyxJQUFJLHNCQUFZLEVBQUU7aUJBQ3BCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDWixLQUFLLEVBQUUsQ0FBQzs0QkFDSixVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUk7NEJBQ3BCLElBQUksRUFBRSxXQUFXO3lCQUNwQixDQUFDO2lCQUNMLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUNWLE1BQU0sbUNBQW1DLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO0tBQUE7Q0FDSjtBQXJCRCw0QkFxQkMifQ==