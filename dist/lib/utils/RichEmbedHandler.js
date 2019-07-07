"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
function default_1(msg, { description, color = '0xFF0000', image, url, title, thumbnail, timestamp = false }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmljaEVtYmVkSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvUmljaEVtYmVkSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUF1RTtBQVl2RSxtQkFBd0IsR0FBaUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEdBQUcsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEdBQUcsS0FBSyxFQUFnQjtJQUN6SSxNQUFNLEtBQUssR0FBaUIsSUFBSSx5QkFBWSxFQUFFO1NBQzdDLFNBQVMsQ0FBRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQW1CLENBQUMsUUFBUSxFQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3ZHLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDZixTQUFTLENBQUUsR0FBRyxDQUFDLE1BQW9CLENBQUMsUUFBUSxFQUFHLEdBQUcsQ0FBQyxNQUFvQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUU3RixJQUFJLFdBQVc7UUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELElBQUksS0FBSztRQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsSUFBSSxHQUFHO1FBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixJQUFJLEtBQUs7UUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLElBQUksU0FBUztRQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsSUFBSSxTQUFTO1FBQUUsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRXBDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFkRCw0QkFjQyJ9