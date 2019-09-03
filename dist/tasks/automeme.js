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
class default_1 extends klasa_1.Task {
    run({ channel }) {
        return __awaiter(this, void 0, void 0, function* () {
            const chan = this.client.channels.get(channel);
            if (!chan)
                return;
            const { enabled, limit } = chan.guild.settings.get('automeme');
            if (!enabled)
                return;
            yield this.client.meme.meme(channel);
            this.client.schedule.create('automeme', Date.now() + (limit * 60 * 1000), {
                data: { channel },
                catchUp: true
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b21lbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGFza3MvYXV0b21lbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUE2QjtBQUk3QixlQUFxQixTQUFRLFlBQUk7SUFFdkIsR0FBRyxDQUFFLEVBQUUsT0FBTyxFQUF1Qjs7WUFDdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBZ0IsQ0FBQztZQUM5RCxJQUFJLENBQUMsSUFBSTtnQkFBRSxPQUFPO1lBRWxCLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFFckIsTUFBTyxJQUFJLENBQUMsTUFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDdEUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFO2dCQUNqQixPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7Q0FDSjtBQWZELDRCQWVDIn0=