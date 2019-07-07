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
            usage: '<duration:time> <text:...str>',
        });
    }
    run(msg, [duration, text]) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.schedule.create('reminder', duration, {
                data: {
                    user: msg.author.id,
                    text,
                },
            });
            return msg.sendMessage('A Reminder was created!');
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtaW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvVXRpbGl0eS9yZW1pbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXVFO0FBR3ZFLGVBQXFCLFNBQVEsZUFBTztJQUNoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLCtCQUErQjtTQUN6QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFnQjs7WUFDL0QsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRTtnQkFDcEQsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRyxHQUFHLENBQUMsTUFBb0IsQ0FBQyxFQUFFO29CQUNsQyxJQUFJO2lCQUNQO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUFBO0NBQ0o7QUFoQkQsNEJBZ0JDIn0=