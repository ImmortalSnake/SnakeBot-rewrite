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
        super(client, store, file, directory, {});
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let audio = this.client.audio;
            if (!msg.member.voice.channel)
                return msg.send('no vc');
            audio.join(msg.member.voice.channel);
            return null;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL011c2ljL3ZvbHVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXVFO0FBS3ZFLGVBQXFCLFNBQVEsZUFBTztJQUNoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDckMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLEdBQUcsQ0FBQyxHQUFpQjs7WUFDOUIsSUFBSSxLQUFLLEdBQUksSUFBSSxDQUFDLE1BQW1CLENBQUMsS0FBSyxDQUFDO1lBRTVDLElBQUksQ0FBRSxHQUFHLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsT0FBTztnQkFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekUsS0FBSyxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsT0FBdUIsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKO0FBYkQsNEJBYUMifQ==