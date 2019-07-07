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
            usage: '<text:...str>',
            requiredPermissions: ['MANAGE_MESSAGES'],
            permissionLevel: 4
        });
    }
    run(msg, [text]) {
        return __awaiter(this, void 0, void 0, function* () {
            return msg.delete().then(() => msg.send(text));
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Z1bi9zYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUE0RDtBQUc1RCxlQUFxQixTQUFRLGVBQU87SUFDaEMsWUFBbUIsTUFBZ0IsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUN2RixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxlQUFlO1lBQ3RCLG1CQUFtQixFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDeEMsZUFBZSxFQUFFLENBQUM7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLEdBQUcsQ0FBQyxHQUFpQixFQUFFLENBQUMsSUFBSSxDQUFXOztZQUNoRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtDQUNKO0FBWkQsNEJBWUMifQ==