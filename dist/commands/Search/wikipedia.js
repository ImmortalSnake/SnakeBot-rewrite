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
const node_fetch_1 = __importDefault(require("node-fetch"));
const discord_js_1 = require("discord.js");
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<text:...str{0,220}>',
            aliases: ['wiki']
        });
    }
    run(msg, [text = 'wiki']) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${text}`);
            const body = yield res.json();
            let page = 1;
            if (msg.flags)
                page = this.getFlags(msg) ? parseInt(this.getFlags(msg).slice(4)) || 1 : 1;
            const data = body.query.pages[page - 1];
            if (!data)
                throw `Could not find this page in wikipedia. Try a lower page`;
            if (data.missing)
                throw `**${text}** was not found in Wikipedia.`;
            console.log(data);
            return msg.sendEmbed(new discord_js_1.MessageEmbed()
                .setColor('#ace9e7')
                .setTitle(`${data.title || text} | Page: ${page}`)
                .setURL(data.fullurl)
                .setFooter('Powered by Wikipedia')
                .setDescription(`${data.extract.length < 2000 ? data.extract : data.extract.slice(0, 1950)}... [Read More](${data.fullurl})`)
                .setThumbnail(data.thumbnail ? data.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png'));
        });
    }
    getFlags(msg) {
        return Object.keys(msg.flags).find(f => f.toLowerCase().startsWith('page'));
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lraXBlZGlhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL1NlYXJjaC93aWtpcGVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFrRjtBQUVsRiw0REFBK0I7QUFDL0IsMkNBQXVEO0FBRXZELGVBQXFCLFNBQVEsZUFBTztJQUVoQyxZQUFZLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDaEYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFXOztZQUN6RCxNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFLLENBQUMsd01BQXdNLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeE8sTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFOUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxHQUFHLENBQUMsS0FBSztnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEcsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJO2dCQUFFLE1BQU0seURBQXlELENBQUM7WUFDM0UsSUFBSSxJQUFJLENBQUMsT0FBTztnQkFBRyxNQUFNLEtBQUssSUFBSSxnQ0FBZ0MsQ0FBQztZQUVuRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLHlCQUFZLEVBQUU7aUJBQ2xDLFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxZQUFZLElBQUksRUFBRSxDQUFDO2lCQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDcEIsU0FBUyxDQUFDLHNCQUFzQixDQUFDO2lCQUNqQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztpQkFDNUgsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw2R0FBNkcsQ0FBQyxDQUFDLENBQUM7UUFDL0ssQ0FBQztLQUFBO0lBRU0sUUFBUSxDQUFDLEdBQWlCO1FBQzdCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7Q0FDSjtBQWhDRCw0QkFnQ0MifQ==