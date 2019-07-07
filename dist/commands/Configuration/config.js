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
class default_1 extends klasa_1.Command {
    constructor(client, store, file, dir) {
        super(client, store, file, dir, {
            subcommands: true,
            aliases: ['settings'],
            cooldown: 5,
            description: 'Sets or shows server settings.',
            permissionLevel: 6,
            usage: '<set|show|remove> (key:key) (value:value) [...]',
        });
        this
            .createCustomResolver('key', (arg, possible, message, [action]) => {
            if (action === 'show' || arg)
                return arg;
            throw message.language.get('COMMAND_CONF_NOKEY');
        })
            .createCustomResolver('value', (arg, possible, message, [action]) => {
            if (!['set', 'remove'].includes(action) || arg)
                return arg;
            throw message.language.get('COMMAND_CONF_NOVALUE');
        });
    }
    show(msg, [key, value]) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = this.client.gateways.guilds.getPath(key, { avoidUnconfigurable: true, errors: false, piece: false });
            if (!path)
                return msg.sendLocale('COMMAND_CONF_GET_NOEXT', [key]);
            if (path.piece.type === 'Folder') {
                return msg.sendLocale('COMMAND_CONF_SERVER', [
                    key ? `: ${key.split('.').map(klasa_1.util.toTitleCase).join('/')}` : '',
                    klasa_1.util.codeBlock('asciidoc', msg.guild.settings.list(msg, path.piece))
                ]);
            }
            return msg.sendLocale('COMMAND_CONF_GET', [path.piece.path, msg.guild.settings.resolveString(msg, path.piece)]);
        });
    }
    set(msg, [key, ...value]) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield msg.guild.settings.update(key, value.join(' '), msg.guild, { avoidUnconfigurable: true, action: 'add' });
            return this.check(msg, key, status) || msg.sendLocale('COMMAND_CONF_UPDATED', [key, msg.guild.settings.resolveString(msg, status.updated[0].piece)]);
        });
    }
    remove(msg, [key, ...value]) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield msg.guild.settings.update(key, value.join(' '), msg.guild, { avoidUnconfigurable: true, action: 'remove' });
            return this.check(msg, key, status) || msg.sendLocale('COMMAND_CONF_UPDATED', [key, msg.guild.settings.resolveString(msg, status.updated[0].piece)]);
        });
    }
    check(msg, key, { errors, updated }) {
        if (errors.length)
            return msg.sendMessage(String(errors[0]));
        if (!updated.length)
            return msg.sendLocale('COMMAND_CONF_NOCHANGE', [key]);
        return null;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0NvbmZpZ3VyYXRpb24vY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBd0c7QUFHeEcsZUFBcUIsU0FBUSxlQUFPO0lBRWhDLFlBQVksTUFBbUIsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxHQUFXO1FBQzdFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDNUIsV0FBVyxFQUFFLElBQUk7WUFDakIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxlQUFlLEVBQUUsQ0FBQztZQUNsQixLQUFLLEVBQUUsaURBQWlEO1NBQzNELENBQUMsQ0FBQztRQUVILElBQUk7YUFDSCxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDOUQsSUFBSSxNQUFNLEtBQUssTUFBTSxJQUFJLEdBQUc7Z0JBQUUsT0FBTyxHQUFHLENBQUM7WUFDekMsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQzthQUNELG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUNoRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUc7Z0JBQUUsT0FBTyxHQUFHLENBQUM7WUFDM0QsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxD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