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
const discord_js_1 = require("discord.js");
class MemeHandler {
    constructor(client) {
        this.subreddit = (subreddit) => `https://www.reddit.com/r/${subreddit}/top/.json?sort=top&t=day&limit=100`;
        this.memeURL = [
            this.subreddit('memes'),
            this.subreddit('dank_meme'),
            this.subreddit('dankmemes'),
            this.subreddit('meirl'),
            'https://www.reddit.com/r/me_irl/top/.json?sort=top&t=day&limit=350',
            this.subreddit('funny'),
            this.subreddit('puns'),
            'https://www.reddit.com/r/surrealmemes/top/.json?sort=top&t=day&limit=350',
            'https://www.reddit.com/user/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=350',
        ];
        this.client = client;
    }
    get random() {
        return this.memeURL[Math.floor(Math.random() * this.memeURL.length)];
    }
    meme(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            let chan = this.client.channels.get(channel);
            if (!channel)
                return;
            return node_fetch_1.default(this.random)
                .then(data => data.json())
                .then((meme) => __awaiter(this, void 0, void 0, function* () {
                console.log(meme);
                if (!meme.data)
                    return;
                console.log(meme.data);
                const post = meme.data.children
                    .filter((po) => po.data.preview)[Math.floor(Math.random() * meme.data.children.length)];
                yield chan.send(new discord_js_1.MessageEmbed()
                    .setColor('AQUA')
                    .setTitle(post.data.title)
                    .setURL(post.data.url)
                    .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
                    .setImage(post.data.url)
                    .setFooter(`posted by ${post.data.author} | 👍 ${post.data.ups} | 💬 ${post.data.num_comments}`));
            }));
        });
    }
}
exports.default = MemeHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc3RydWN0dXJlcy9tZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSw0REFBK0I7QUFDL0IsMkNBQW1FO0FBRW5FLE1BQXFCLFdBQVc7SUFrQjVCLFlBQVksTUFBZ0I7UUFkckIsY0FBUyxHQUFHLENBQUMsU0FBaUIsRUFBRSxFQUFFLENBQUMsNEJBQTRCLFNBQVMscUNBQXFDLENBQUM7UUFDOUcsWUFBTyxHQUFHO1lBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkIsb0VBQW9FO1lBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3RCLDBFQUEwRTtZQUMxRSxxRkFBcUY7U0FDeEYsQ0FBQztRQUlFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFWSxJQUFJLENBQUMsT0FBZTs7WUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBZ0IsQ0FBQztZQUM1RCxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQ3JCLE9BQU8sb0JBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ3pCLElBQUksQ0FBQyxDQUFPLElBQVMsRUFBRSxFQUFFO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQUUsT0FBTztnQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtxQkFDMUIsTUFBTSxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBRWpHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFZLEVBQUU7cUJBQzdCLFFBQVEsQ0FBQyxNQUFNLENBQUM7cUJBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztxQkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3FCQUNyQixTQUFTLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFtQixDQUFDLEdBQUcsRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQW1CLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztxQkFDcEcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3FCQUN2QixTQUFTLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztLQUFBO0NBQ0o7QUEvQ0QsOEJBK0NDIn0=