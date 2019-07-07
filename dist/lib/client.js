"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const RichEmbedHandler_1 = __importDefault(require("./utils/RichEmbedHandler"));
const permissionLevel_1 = __importDefault(require("./structures/permissionLevel"));
require("./structures/schemas/guildSchema");
const manager_1 = __importDefault(require("./structures/audio/manager"));
const meme_1 = __importDefault(require("./structures/meme"));
class SnakeBot extends klasa_1.Client {
    constructor(...args) {
        super(...args);
        this.shardCount = 1;
        this.id = '543796400165748736';
        this.permissionLevels = permissionLevel_1.default;
        this.audio = new manager_1.default(this);
        this.meme = new meme_1.default(this);
    }
    get embed() {
        return RichEmbedHandler_1.default;
    }
}
exports.default = SnakeBot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBK0I7QUFDL0IsZ0ZBQTZDO0FBQzdDLG1GQUEyRDtBQUMzRCw0Q0FBMEM7QUFDMUMseUVBQXNEO0FBQ3RELDZEQUE0QztBQUU1QyxNQUFxQixRQUFTLFNBQVEsY0FBTTtJQU14QyxZQUFZLEdBQUcsSUFBUztRQUNwQixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHlCQUFlLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGlCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGNBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTywwQkFBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQW5CRCwyQkFtQkMifQ==