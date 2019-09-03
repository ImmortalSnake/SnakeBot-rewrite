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
    number_string(num) {
        switch (num) {
            case 1: return 'one';
            case 2: return 'two';
            case 3: return 'three';
            case 4: return 'four';
            case 5: return 'five';
            case 6: return 'six';
            case 7: return 'seven';
            case 8: return 'eight';
            case 9: return 'nine';
            case 0: return 'zero';
            default: return '';
        }
    }
    static comma(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}
exports.default = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsTUFBcUIsSUFBSTtJQUF6QjtRQUtvQixRQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxPQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUF1QzNELENBQUM7SUFyQ2dCLE1BQU0sQ0FBQyxPQUFvQixFQUFFLElBQVUsRUFBRSxJQUFJLEdBQUcsS0FBSzs7WUFDOUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFZLEVBQUUsRUFBRTtnQkFDNUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDeEMsT0FBUSxHQUFHLENBQUMsTUFBZSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4RyxDQUFDLENBQUM7WUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO2dCQUMvQyxHQUFHLEVBQUUsQ0FBQztnQkFDTixJQUFJO2FBQ1AsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLE1BQU0sTUFBTSxHQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDM0MsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDM0MsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUFDLEdBQVc7UUFDM0IsUUFBUSxHQUFHLEVBQUU7WUFDVCxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUM7WUFDckIsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQztZQUN2QixLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUM7WUFDdEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQztZQUNyQixLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUM7WUFDdkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQztZQUN0QixLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUdELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBVztRQUNwQixPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUVKO0FBN0NELHVCQTZDQyJ9