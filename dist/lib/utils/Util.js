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
class Util {
    constructor() {
        this.yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
        this.no = ['no', 'n', 'nah', 'nope', 'nop'];
    }
    verify(channel, user, time = 30000) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = (res) => {
                const value = res.content.toLowerCase();
                return res.author.id === user.id && (this.yes.includes(value) || this.no.includes(value));
            };
            const verify = yield channel.awaitMessages(filter, {
                max: 1,
                time,
            });
            if (!verify.size)
                return 0;
            const choice = verify.first().content.toLowerCase();
            if (this.yes.includes(choice))
                return true;
            if (this.no.includes(choice))
                return false;
            return false;
        });
    }
}
exports.default = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsTUFBcUIsSUFBSTtJQUF6QjtRQUtvQixRQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxPQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFpQjNELENBQUM7SUFmZ0IsTUFBTSxDQUFDLE9BQW9CLEVBQUUsSUFBVSxFQUFFLElBQUksR0FBRyxLQUFLOztZQUM5RCxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQVksRUFBRSxFQUFFO2dCQUM1QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN4QyxPQUFRLEdBQUcsQ0FBQyxNQUFlLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLENBQUMsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9DLEdBQUcsRUFBRSxDQUFDO2dCQUNOLElBQUk7YUFDUCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0IsTUFBTSxNQUFNLEdBQUksTUFBTSxDQUFDLEtBQUssRUFBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUMzQyxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO0tBQUE7Q0FDSjtBQXZCRCx1QkF1QkMifQ==