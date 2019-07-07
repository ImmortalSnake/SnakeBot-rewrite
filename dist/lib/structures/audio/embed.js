"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class AudioEmbed extends discord_js_1.MessageEmbed {
    constructor(client, track) {
        super();
        this.setAuthor(client.user.username, client.user.displayAvatarURL());
        this.setURL(track.uri);
        this.setTitle(track.title);
        this.setThumbnail(track.thumbnail);
        this.setColor('BLUE');
        this.addField('Requestor', client.users.get(track.requester).toString());
        this.addField('Author', track.author);
    }
}
exports.default = AudioEmbed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3N0cnVjdHVyZXMvYXVkaW8vZW1iZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNEQ7QUFHNUQsTUFBcUIsVUFBVyxTQUFRLHlCQUFZO0lBQ2hELFlBQVksTUFBbUIsRUFBRSxLQUFpQjtRQUM5QyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxTQUFTLENBQUUsTUFBTSxDQUFDLElBQW1CLENBQUMsUUFBUSxFQUFHLE1BQU0sQ0FBQyxJQUFtQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0o7QUFYRCw2QkFXQyJ9