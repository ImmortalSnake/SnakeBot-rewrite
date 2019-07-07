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
const discord_js_1 = require("discord.js");
const ms = require('ms');
function default_1(msg, { id, reason, user, type, moderator, duration }) {
    return __awaiter(this, void 0, void 0, function* () {
        const chan = msg.guild.channels.get(msg.guild.settings.get('channels.log')) || msg.channel;
        const _user = msg.client.users.get(user);
        const mod = msg.client.users.get(moderator);
        const logEmbed = new discord_js_1.MessageEmbed()
            .setAuthor(msg.client.user.tag, msg.client.user.displayAvatarURL())
            .setTitle(`${type}: Case #${id}`)
            .setColor('0xFF0000')
            .addField('Moderator', mod.toString(), true)
            .setDescription(`Reason: \`${reason}\``)
            .addField('Punished User', _user.toString(), true)
            .setFooter('At: ')
            .setTimestamp();
        if (duration)
            logEmbed.addField('Duration', ms(duration, { long: true }), true);
        return chan.send(logEmbed);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvTG9nSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsMkNBQXlGO0FBQ3pGLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQVl6QixtQkFBOEIsR0FBaUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFvQjs7UUFDOUcsTUFBTSxJQUFJLEdBQUksR0FBRyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxLQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ3RILE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQVMsQ0FBQztRQUNqRCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFTLENBQUM7UUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSx5QkFBWSxFQUFFO2FBQzlCLFNBQVMsQ0FBRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQW1CLENBQUMsR0FBRyxFQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ2xHLFFBQVEsQ0FBQyxHQUFHLElBQUksV0FBVyxFQUFFLEVBQUUsQ0FBQzthQUNoQyxRQUFRLENBQUMsVUFBVSxDQUFDO2FBQ3BCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQzthQUMzQyxjQUFjLENBQUMsYUFBYSxNQUFNLElBQUksQ0FBQzthQUN2QyxRQUFRLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUM7YUFDakQsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUNqQixZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLFFBQVE7WUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsT0FBUSxJQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQUE7QUFoQkQsNEJBZ0JDIn0=