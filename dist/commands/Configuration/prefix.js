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
            aliases: ['setPrefix'],
            cooldown: 5,
            description: 'Change the command prefix the bot uses in your server.',
            permissionLevel: 6,
            usage: '[reset|prefix:str{1,10}]',
        });
    }
    run(message, [prefix]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!prefix)
                return message.send(`The prefix for this guild is \`${message.guild.settings.get('prefix')}\``);
            if (prefix === 'reset')
                return this.reset(message);
            if (message.guild.settings.get('prefix') === prefix)
                throw message.language.get('CONFIGURATION_EQUALS');
            yield message.guild.settings.update('prefix', prefix);
            return message.send(`The prefix for this guild has been set to \`${prefix}\``);
        });
    }
    reset(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message.guild.settings.reset('prefix');
            return message.send(`Switched back the guild's prefix back to \`${this.client.options.prefix}\`!`);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0NvbmZpZ3VyYXRpb24vcHJlZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBeUU7QUFHekUsZUFBcUIsU0FBUSxlQUFPO0lBRWhDLFlBQVksTUFBbUIsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxHQUFXO1FBQzdFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDNUIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsV0FBVyxFQUFFLHdEQUF3RDtZQUNyRSxlQUFlLEVBQUUsQ0FBQztZQUNsQixLQUFLLEVBQUUsMEJBQTBCO1NBQ3BDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxHQUFHLENBQUMsT0FBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBVzs7WUFDdEQsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLGtDQUFtQyxPQUFPLENBQUMsS0FBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hILElBQUksTUFBTSxLQUFLLE9BQU87Z0JBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELElBQUssT0FBTyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU07Z0JBQUUsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ25ILE1BQU8sT0FBTyxDQUFDLEtBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNqRSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsK0NBQStDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDbkYsQ0FBQztLQUFBO0lBRVksS0FBSyxDQUFDLE9BQXFCOztZQUNwQyxNQUFPLE9BQU8sQ0FBQyxLQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsOENBQThDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDdkcsQ0FBQztLQUFBO0NBRUo7QUF6QkQsNEJBeUJDIn0=