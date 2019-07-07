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
                            .addField('Video Count', body.videoCount, true)
                            .addField('Total Views', body.viewCount, true)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9GdW4vY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXVFO0FBR3ZFLGVBQXFCLFNBQVEsZUFBTztJQUdoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDekIsQ0FBQyxDQUFDO1FBTkEsY0FBUyxHQUFHLElBQUksaUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQU9oRCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQVc7O1lBQ3JELE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7aUJBQy9CLElBQUksQ0FBQyxDQUFDLENBQWdDLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLE1BQW1CLENBQUMsS0FBSyxDQUFDO2dCQUM5QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7cUJBQ2pFLElBQUksQ0FBQyxDQUFDLElBQVcsRUFBRSxFQUFFO29CQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFBRSxNQUFNLG9EQUFvRCxDQUFDO29CQUN6RSxNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsTUFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUMvQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVzt3QkFDNUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUs7d0JBQ2hDLEtBQUssRUFBRSxLQUFLO3FCQUNmLENBQUMsQ0FBQztvQkFFSCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzt5QkFDMUUsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7d0JBQ2hCLE9BQVEsQ0FBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSzs2QkFDaEMsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQzs2QkFDOUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQzs2QkFDN0MsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDOzZCQUN0RSxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOzZCQUN6QyxNQUFNLENBQUMsbUNBQW1DLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO0tBQUE7Q0FDSjtBQW5DRCw0QkFtQ0MifQ==