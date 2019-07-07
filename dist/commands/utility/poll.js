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
            usage: '<title:...str>',
        });
    }
    run(msg, [title]) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = this.client.embed(msg, {
                title,
                description: 'React Below!'
            });
            const m = yield msg.sendEmbed(embed);
            yield m.react('👍');
            yield m.react('👎');
            return m;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9VdGlsaXR5L3BvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUF1RTtBQUd2RSxlQUFxQixTQUFRLGVBQU87SUFDaEMsWUFBbUIsTUFBZ0IsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUN2RixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxnQkFBZ0I7U0FDMUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLEdBQUcsQ0FBQyxHQUFpQixFQUFFLENBQUMsS0FBSyxDQUFXOztZQUNqRCxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsTUFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUMvQyxLQUFLO2dCQUNMLFdBQVcsRUFBRSxjQUFjO2FBQzlCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQWlCLENBQUM7WUFDckQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwQixPQUFPLENBQUMsQ0FBQztRQUNiLENBQUM7S0FBQTtDQUNKO0FBbEJELDRCQWtCQyJ9