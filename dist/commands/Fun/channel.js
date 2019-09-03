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
const klasa_1 = require("klasa");
const Util_1 = __importDefault(require("../../lib/utils/Util"));
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<ytchannel:...str>',
            aliases: ['ytchannel']
        });
        this.timestamp = new klasa_1.Timestamp('d MMMM YYYY');
    }
    run(msg, [ytchannel]) {
        return __awaiter(this, void 0, void 0, function* () {
            return msg.sendMessage('Loading...')
                .then((m) => {
                const audio = this.client.audio;
                return audio.youtube.searchChannels(ytchannel, 1, { part: 'snippet' })
                    .then((data) => {
                    if (!data[0])
                        throw 'Could not find any youtube channel with that title';
                    const embed = this.client.embed(msg, {
                        description: data[0].raw.snippet.description,
                        title: data[0].raw.snippet.title,
                        color: 'RED'
                    });
                    return audio.youtube.getChannelByID(data[0].id, { part: 'statistics,snippet' })
                        .then((body) => {
                        return m.edit(embed
                            .addField('Video Count', Util_1.default.comma(body.videoCount), true)
                            .addField('Total Views', Util_1.default.comma(body.viewCount), true)
                            .addField('Created At', this.timestamp.display(body.publishedAt), true)
                            .setThumbnail(body.thumbnails.default.url)
                            .setURL(`https://www.youtube.com/channel/${body.id}`));
                    });
                });
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9GdW4vY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXVFO0FBRXZFLGdFQUF3QztBQUV4QyxlQUFxQixTQUFRLGVBQU87SUFHaEMsWUFBbUIsTUFBZ0IsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxTQUFpQjtRQUN2RixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztRQU5BLGNBQVMsR0FBRyxJQUFJLGlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7SUFPaEQsQ0FBQztJQUVZLEdBQUcsQ0FBQyxHQUFpQixFQUFFLENBQUMsU0FBUyxDQUFXOztZQUNyRCxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO2lCQUMvQixJQUFJLENBQUMsQ0FBQyxDQUFnQyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxNQUFtQixDQUFDLEtBQUssQ0FBQztnQkFDOUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3FCQUNqRSxJQUFJLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQUUsTUFBTSxvREFBb0QsQ0FBQztvQkFDekUsTUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLE1BQW1CLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDL0MsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVc7d0JBQzVDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO3dCQUNoQyxLQUFLLEVBQUUsS0FBSztxQkFDZixDQUFDLENBQUM7b0JBRUgsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLENBQUM7eUJBQzFFLElBQUksQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO3dCQUNoQixPQUFRLENBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUs7NkJBQ2hDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsY0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDOzZCQUMxRCxRQUFRLENBQUMsYUFBYSxFQUFFLGNBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQzs2QkFDekQsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDOzZCQUN0RSxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOzZCQUN6QyxNQUFNLENBQUMsbUNBQW1DLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO0tBQUE7Q0FDSjtBQW5DRCw0QkFtQ0MifQ==