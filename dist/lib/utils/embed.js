"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
function default_1(msg, { description = null, color = '0xFF0000', image = null, url = null, title = null, thumbnail = null, timestamp = false }) {
    const embed = new discord_js_1.MessageEmbed()
        .setAuthor(msg.client.user.username, msg.client.user.displayAvatarURL())
        .setColor(color)
        .setFooter(msg.author.username, msg.author.displayAvatarURL());
    if (description)
        embed.setDescription(description);
    if (image)
        embed.setImage(image);
    if (url)
        embed.setURL(url);
    if (title)
        embed.setTitle(title);
    if (thumbnail)
        embed.setThumbnail(thumbnail);
    if (timestamp)
        embed.setTimestamp();
    return embed;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL2VtYmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQXNFO0FBWXRFLG1CQUF3QixHQUFpQixFQUFFLEVBQUUsV0FBVyxHQUFHLElBQUksRUFBRSxLQUFLLEdBQUcsVUFBVSxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRyxJQUFJLEVBQUUsU0FBUyxHQUFHLEtBQUssRUFBTztJQUNuSyxNQUFNLEtBQUssR0FBaUIsSUFBSSx5QkFBWSxFQUFFO1NBQzdDLFNBQVMsQ0FBRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQW1CLENBQUMsUUFBUSxFQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3ZHLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDZixTQUFTLENBQUUsR0FBRyxDQUFDLE1BQW9CLENBQUMsUUFBUSxFQUFHLEdBQUcsQ0FBQyxNQUFvQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUU3RixJQUFHLFdBQVc7UUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUcsS0FBSztRQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsSUFBRyxHQUFHO1FBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixJQUFHLEtBQUs7UUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLElBQUcsU0FBUztRQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsSUFBRyxTQUFTO1FBQUUsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRW5DLE9BQU8sS0FBSyxDQUFBO0FBQ2hCLENBQUM7QUFkRCw0QkFjQyJ9