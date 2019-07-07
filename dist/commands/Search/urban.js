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
const ZWS = '\u200B';
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            aliases: ['ud', 'urbandictionary'],
            requiredPermissions: ['EMBED_LINKS'],
            usage: '<query:...string{0,240}>',
            nsfw: true
        });
    }
    run(msg, [query]) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield node_fetch_1.default(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`);
            const { list } = yield response.json();
            let page = 1;
            if (msg.flags)
                page = this.getFlags(msg) ? parseInt(this.getFlags(msg).slice(4)) || 1 : 1;
            const result = list[page - 1];
            if (typeof result === 'undefined') {
                throw page === 1 ?
                    'I could not find this entry in UrbanDictionary' :
                    'I could not find this page in UrbanDictionary, try a lower page';
            }
            const definition = this.content(result.definition, result.permalink);
            return msg.sendEmbed(new discord_js_1.MessageEmbed()
                .setTitle(`Definition of ${klasa_1.util.toTitleCase(query)} ${page}/${list.length}`)
                .setURL(result.permalink)
                .setColor('AQUA')
                .setThumbnail('http://i.imgur.com/CcIZZsa.png')
                .setDescription(definition)
                .addField('Example', this.cutText(result.example, 750))
                .addField(ZWS, `\\👍 ${result.thumbs_up}`, true)
                .addField(ZWS, `\\👎 ${result.thumbs_down}`, true)
                .setFooter(`${result.author} | © Urban Dictionary`));
        });
    }
    content(definition, permalink) {
        if (definition.length < 750)
            return definition;
        return `${this.cutText(definition, 750)}... [continue reading](${permalink})`;
    }
    cutText(str, length) {
        if (str.length < length)
            return str;
        const cut = this.splitText(str, length - 3);
        if (cut.length < length - 3)
            return `${cut}...`;
        return `${cut.slice(0, length - 3)}...`;
    }
    splitText(str, length, char = ' ') {
        const x = str.substring(0, length).lastIndexOf(char);
        const pos = x === -1 ? length : x;
        return str.substring(0, pos);
    }
    getFlags(msg) {
        return Object.keys(msg.flags).find(f => f.toLowerCase().startsWith('page'));
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJiYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvU2VhcmNoL3VyYmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBa0U7QUFFbEUsNERBQStCO0FBQy9CLDJDQUEwQztBQUUxQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUM7QUFFckIsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUM7WUFDbEMsbUJBQW1CLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDcEMsS0FBSyxFQUFFLDBCQUEwQjtZQUNqQyxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsR0FBaUIsRUFBRSxDQUFDLEtBQUssQ0FBVzs7WUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxvQkFBSyxDQUFDLGlEQUFpRCxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0csTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXZDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNiLElBQUksR0FBRyxDQUFDLEtBQUs7Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRHLE1BQU0sTUFBTSxH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