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
const sources = ['akairo', 'akairo-master', 'commando'];
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<search:...str>',
        });
    }
    run(msg, [query]) {
        return __awaiter(this, void 0, void 0, function* () {
            let type = msg.flags ? msg.flags[Object.keys(msg.flags)[0]] : 'master';
            if (!sources.includes(type))
                type = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${type}.json`;
            return node_fetch_1.default(`https://djsdocs.sorta.moe/v2/embed?src=${type}&q=${query}`)
                .then((res) => res.json())
                .then((body) => msg.send({ embed: body }))
                .catch(() => msg.send('Could not fetch any search results'));
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9VdGlsaXR5L2RvY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF1RTtBQUV2RSw0REFBK0I7QUFDL0IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRXhELGVBQXFCLFNBQVEsZUFBTztJQUNoQyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLGlCQUFpQjtTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQVc7O1lBQ2pELElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLEdBQUksK0RBQStELElBQUksT0FBTyxDQUFDO1lBRWhILE9BQU8sb0JBQUssQ0FBQywwQ0FBMEMsSUFBSSxNQUFNLEtBQUssRUFBRSxDQUFDO2lCQUN4RSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDekIsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ3ZDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDO0tBQUE7Q0FDSjtBQWhCRCw0QkFnQkMifQ==