"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_lavalink_1 = require("discord.js-lavalink");
class LavaAudioPlayer extends discord_js_lavalink_1.Player {
    constructor(node, options) {
        super(node, options);
        this.next = [];
        this.last = [];
        this.reqs = new Map();
        this.repeat = false;
        this.current = null;
        this.message = null;
        this.basslvl = 'none';
    }
}
exports.default = LavaAudioPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9zdHJ1Y3R1cmVzL2F1ZGlvL3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZEQUEwRTtBQUUxRSxNQUFxQixlQUFnQixTQUFRLDRCQUFNO0lBUy9DLFlBQVksSUFBa0IsRUFBRSxPQUFzQjtRQUNsRCxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztDQUNKO0FBbkJELGtDQW1CQyJ9