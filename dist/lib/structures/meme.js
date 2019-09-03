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
        this.subreddit = (subreddit) => `https://www.reddit.com/r/${subreddit}/top/.json?sort=hot&t=day&limit=100`;
        this.dogURL = 'https://www.reddit.com/r/dogs/top/.json?sort=new&t=day&limit=100';
        this.catURL = 'https://www.reddit.com/r/cats/top/.json?sort=new&t=day&limit=100';
        this.memeURL = [
            this.subreddit('memes'),
            this.subreddit('dank_meme'),
            this.subreddit('dankmemes'),
            this.subreddit('meirl'),
            this.subreddit('me_irl'),
            this.subreddit('funny'),
            this.subreddit('puns'),
            this.subreddit('surrealmemes'),
            'https://www.reddit.com/user/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=350'
        ];
        this.client = client;
    }
    get random() {
        return this.memeURL[Math.floor(Math.random() * this.memeURL.length)];
    }
    cat(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            let chan = this.client.channels.get(channel);
            if (!chan)
                return;
            return chan.send(yield this.search_reddit(this.catURL));
        });
    }
    dog(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            let chan = this.client.channels.get(channel);
            if (!chan)
                return;
            return chan.send(yield this.search_reddit(this.dogURL));
        });
    }
    meme(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            let chan = this.client.channels.get(channel);
            if (!chan)
                return;
            return chan.send(yield this.search_reddit(this.random));
        });
    }
    search_reddit(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return node_fetch_1.default(url)
                .then(data => data.json())
                .then((meme) => __awaiter(this, void 0, void 0, function* () {
                if (!meme || !meme.data)
                    return 'Something is wrong. Try again later';
                const post = meme.data.children
                    .filter((po) => po && po.data && po.data.preview)[Math.floor(Math.random() * meme.data.children.length)];
                return new discord_js_1.MessageEmbed()
                    .setColor('AQUA')
                    .setTitle(post.data.title)
                    .setURL(post.data.url)
                    .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
                    .setImage(post.data.url)
                    .setFooter(`posted by ${post.data.author} | 👍 ${post.data.ups} | 💬 ${post.data.num_comments}`);
            }));
        });
    }
}
exports.default = MemeHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc3RydWN0dXJlcy9tZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSw0REFBK0I7QUFDL0IsMkNBQW1FO0FBRW5FLE1BQXFCLFdBQVc7SUFvQjVCLFlBQVksTUFBZ0I7UUFoQnJCLGNBQVMsR0FBRyxDQUFDLFNBQWlCLEVBQUUsRUFBRSxDQUFDLDRCQUE0QixTQUFTLHFDQUFxQyxDQUFDO1FBQzlHLFdBQU0sR0FBRyxrRUFBa0UsQ0FBQztRQUM1RSxXQUFNLEdBQUcsa0VBQWtFLENBQUM7UUFDNUUsWUFBTyxHQUFHO1lBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFDOUIscUZBQXFGO1NBQ3hGLENBQUM7UUFJRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRVksR0FBRyxDQUFDLE9BQWU7O1lBQzVCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFD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