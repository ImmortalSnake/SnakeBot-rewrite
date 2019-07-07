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
const discord_js_1 = require("discord.js");
const regex = klasa_1.Serializer.regex;
module.exports = class extends klasa_1.Serializer {
    deserialize(data, piece, language, guild) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data instanceof discord_js_1.Message)
                return data;
            if (typeof data !== 'string')
                throw this.error(language, piece.key);
            const [channelID, messageID] = data.split('/', 2);
            if (!(channelID && messageID))
                throw this.error(language, piece.key);
            const channel = yield this.client.serializers.get('channel').deserialize(channelID, { key: piece.key, type: 'textchannel' }, language, guild);
            const messagePromise = regex.snowflake.test(messageID) ? channel.messages.fetch(messageID) : null;
            if (messagePromise)
                return messagePromise;
            throw language.get('RESOLVER_INVALID_MESSAGE', `${piece.key}.split('/')[1]`);
        });
    }
    serialize(data) {
        return `${data.channel.id}/${data.id}`;
    }
    stringify({ data, channel }) {
        return ((channel.messages || channel.channel.messages).get(data) || { content: (data && data.content) || data }).content;
    }
    error(language, name) {
        return [
            language.get('RESOLVER_INVALID_CHANNEL', `${name}.split('/')[0]`),
            language.get('RESOLVER_INVALID_MESSAGE', `${name}.split('/')[1]`)
        ].join(' ');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemVycy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxpQ0FBc0U7QUFDdEUsMkNBQXFDO0FBQ3JDLE1BQU0sS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDO0FBRS9CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBTSxTQUFRLGtCQUFVO0lBRS9CLFdBQVcsQ0FBQyxJQUFTLEVBQUUsS0FBa0IsRUFBRSxRQUFrQixFQUFFLEtBQWlCOztZQUNsRixJQUFJLElBQUksWUFBWSxvQkFBTztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUN6QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7Z0JBQUUsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDO2dCQUFFLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXJFLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQzlFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBaUIsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0UsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbEcsSUFBSSxjQUFjO2dCQUFFLE9BQU8sY0FBYyxDQUFDO1lBRTFDLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDakYsQ0FBQztLQUFBO0lBRUQsU0FBUyxDQUFDLElBQVM7UUFDZixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFNO1FBRTFCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQzdILENBQUM7SUFFTyxLQUFLLENBQUMsUUFBa0IsRUFBRSxJQUFZO1FBRTFDLE9BQU87WUFDSCxRQUFRLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztZQUNqRSxRQUFRLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztTQUNwRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0NBRUosQ0FBQyJ9