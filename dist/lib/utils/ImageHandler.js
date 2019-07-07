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
class ImageHandler {
    constructor() {
        this.dankYoutubeURL = (msg, text) => `https://dankmemer.services/api/youtube?avatar1=${msg.author.displayAvatarURL()}&username1=${msg.author.username}&text=${text}`;
        this.dankTweetURL = (msg, text) => `https://dankmemer.services/api/tweet?avatar1=${msg.author.displayAvatarURL()}&username1=${msg.author.username}&text=${text}`;
        this.dankHitlerURL = (image) => `https://dankmemer.services/api/hitler?avatar1=${image}`;
        this.dankMagikURL = (image) => `https://dankmemer.services/api/magik?avatar1=${image}`;
        this.dankTriggerURL = (image) => `https://dankmemer.services/api/trigger?avatar1=${image}`;
        this.dankWantedURL = (image) => `https://dankmemer.services/api/wanted?avatar1=${image}`;
    }
    getImage(msg, { user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield msg.channel.messages.fetch();
            const sort = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp);
            let img = null;
            sort.some(m => {
                const [att] = m.attachments.values();
                if (att && att.height) {
                    const image = node_fetch_1.default(att.url)
                        .then((response) => response.url)
                        .catch();
                    if (image)
                        img = image;
                    return image ? true : false;
                }
                else
                    return false;
            });
            return img || (user || msg.author).displayAvatarURL();
        });
    }
    dankImage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return node_fetch_1.default(url, {
                headers: {
                    Authorization: process.env.DANK_KEY
                }
            });
        });
    }
    ytImage(msg, text) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dankImage(this.dankYoutubeURL(msg, text));
        });
    }
    tweetImage(msg, text) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dankImage(this.dankTweetURL(msg, text));
        });
    }
    hitlerImage(msg, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.getImage(msg, { user }).catch((e) => { throw e; });
            return this.dankImage(this.dankHitlerURL(image));
        });
    }
    magikImage(msg, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.getImage(msg, { user }).catch((e) => { throw e; });
            return this.dankImage(this.dankMagikURL(image));
        });
    }
    triggerImage(msg, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.getImage(msg, { user }).catch((e) => { throw e; });
            return this.dankImage(this.dankTriggerURL(image));
        });
    }
    wantedImage(msg, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.getImage(msg, { user }).catch((e) => { throw e; });
            return this.dankImage(this.dankWantedURL(image));
        });
    }
}
exports.default = ImageHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91dGlscy9JbWFnZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLDREQUErQjtBQU0vQixNQUFxQixZQUFZO0lBQWpDO1FBRXFCLG1CQUFjLEdBQUcsQ0FBQyxHQUFpQixFQUFFLElBQVksRUFBRSxFQUFFLENBQUMsa0RBQW1ELEdBQUcsQ0FBQyxNQUFlLENBQUMsZ0JBQWdCLEVBQUUsY0FBZSxHQUFHLENBQUMsTUFBZSxDQUFDLFFBQVEsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUMxTSxpQkFBWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxJQUFZLEVBQUUsRUFBRSxDQUFDLGdEQUFpRCxHQUFHLENBQUMsTUFBZSxDQUFDLGdCQUFnQixFQUFFLGNBQWUsR0FBRyxDQUFDLE1BQWUsQ0FBQyxRQUFRLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDdE0sa0JBQWEsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsaURBQWlELEtBQUssRUFBRSxDQUFDO1FBQzVGLGlCQUFZLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLGdEQUFnRCxLQUFLLEVBQUUsQ0FBQztRQUMxRixtQkFBYyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxrREFBa0QsS0FBSyxFQUFFLENBQUM7UUFDOUYsa0JBQWEsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsaURBQWlELEtBQUssRUFBRSxDQUFDO0lBeURqSCxDQUFDO0lBdkRnQixRQUFRLENBQUMsR0FBaUIsRUFBRSxFQUFFLElBQUksRUFBZ0I7O1lBQzNELE1BQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVUsRUFBRSxDQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVoRyxJQUFJLEdBQUcsR0FBUSxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDVixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDbkIsTUFBTSxLQUFLLEdBQUcsb0JBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO3lCQUN2QixJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7eUJBQ2hDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksS0FBSzt3QkFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDO29CQUN2QixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7aUJBQy9COztvQkFBTSxPQUFPLEtBQUssQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFjLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2xFLENBQUM7S0FBQTtJQUVZLFNBQVMsQ0FBQyxHQUFXOztZQUM5QixPQUFPLG9CQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFrQjtpQkFDaEQ7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsR0FBaUIsRUFBRSxJQUFZOztZQUNoRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQUE7SUFFWSxVQUFVLENBQUMsR0FBaUIsRUFBRSxJQUFZOztZQUNuRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFWSxXQUFXLENBQUMsR0FBaUIsRUFBRSxJQUFVOztZQUNsRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7SUFFWSxVQUFVLENBQUMsR0FBaUIsRUFBRSxJQUFVOztZQUNqRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQUE7SUFFWSxZQUFZLENBQUMsR0FBaUIsRUFBRSxJQUFVOztZQUNuRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFWSxXQUFXLENBQUMsR0FBaUIsRUFBRSxJQUFVOztZQUNsRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7Q0FDSjtBQWhFRCwrQkFnRUMifQ==