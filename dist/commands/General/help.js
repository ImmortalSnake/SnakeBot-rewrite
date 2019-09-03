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
const PERMISSIONS_RICHDISPLAY = new discord_js_1.Permissions([discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES, discord_js_1.Permissions.FLAGS.ADD_REACTIONS]);
const time = 1000 * 60 * 3;
class HelpCommand extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            aliases: ['commands', 'cmd', 'cmds'],
            guarded: true,
            description: (language) => language.get('COMMAND_HELP_DESCRIPTION'),
            usage: '(Command:command)'
        });
        this.createCustomResolver('command', (arg, possible, message) => {
            if (!arg || arg === '')
                return undefined;
            return this.client.arguments.get('command').run(arg, possible, message);
        });
        this.handlers = new Map();
    }
    run(message, [command]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (command) {
                return message.sendMessage([
                    `= ${command.name} = `,
                    klasa_1.util.isFunction(command.description) ? command.description(message.language) : command.description,
                    message.language.get('COMMAND_HELP_USAGE', command.usage.fullUsage(message)),
                    message.language.get('COMMAND_HELP_EXTENDED'),
                    klasa_1.util.isFunction(command.extendedHelp) ? command.extendedHelp(message.language) : command.extendedHelp
                ], { code: 'asciidoc' });
            }
            if (!('all' in message.flags) && message.guild && message.channel.permissionsFor(this.client.user).has(PERMISSIONS_RICHDISPLAY)) {
                const previousHandler = this.handlers.get(message.author.id);
                if (previousHandler)
                    previousHandler.stop();
                const handler = yield (yield this.buildDisplay(message)).run(yield message.send('Loading Commands...'), {
                    filter: (reaction, user) => user.id === message.author.id,
                    time
                });
                handler.on('end', () => this.handlers.delete(message.author.id));
                this.handlers.set(message.author.id, handler);
                return null;
            }
            message.author.send(yield this.buildHelp(message), { split: { char: '\n' } })
                .then(() => { if (message.channel.type !== 'dm')
                message.sendMessage(message.language.get('COMMAND_HELP_DM')); })
                .catch(() => { if (message.channel.type !== 'dm')
                message.sendMessage(message.language.get('COMMAND_HELP_NODM')); });
            return null;
        });
    }
    buildHelp(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = yield this._fetchCommands(message);
            const { prefix } = message.guildSettings;
            const helpMessage = [];
            for (const [category, list] of commands) {
                helpMessage.push(`**${category} Commands**:\n`, list.map(this.formatCommand.bind(this, message, prefix, false)).join('\n'), '');
            }
            return helpMessage.join('\n');
        });
    }
    buildDisplay(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = yield this._fetchCommands(message);
            const { prefix } = message.guildSettings;
            const display = new klasa_1.RichDisplay();
            const color = message.member.displayColor;
            for (const [category, list] of commands) {
                display.addPage(new discord_js_1.MessageEmbed()
                    .setTitle(`${category} Commands`)
                    .setColor(color)
                    .setDescription(list.map(this.formatCommand.bind(this, message, prefix, true)).join('\n')));
            }
            return display;
        });
    }
    formatCommand(message, prefix, richDisplay, command) {
        const description = klasa_1.util.isFunction(command.description) ? command.description(message.language) : command.description;
        return richDisplay ? `• ${prefix}${command.name} → ${description}` : `• **${prefix}${command.name}** → ${description}`;
    }
    _fetchCommands(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const run = this.client.inhibitors.run.bind(this.client.inhibitors, message);
            const commands = new Map();
            yield Promise.all(this.client.commands.map((command) => run(command, true)
                .then(() => {
                const category = commands.get(command.category);
                if (category)
                    category.push(command);
                else
                    commands.set(command.category, [command]);
            }).catch(() => {
            })));
            return commands;
        });
    }
}
exports.default = HelpCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9HZW5lcmFsL2hlbHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUErRTtBQUMvRSwyQ0FBbUc7QUFHbkcsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLHdCQUFXLENBQUMsQ0FBQyx3QkFBVyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsd0JBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUN0SCxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUUzQixNQUFxQixXQUFZLFNBQVEsZUFBTztJQUc1QyxZQUFtQixNQUFnQixFQUFFLEtBQW1CLEVBQUUsSUFBYyxFQUFFLFNBQWlCO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDcEMsT0FBTyxFQUFFLElBQUk7WUFDYixXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7WUFDbkUsS0FBSyxFQUFFLG1CQUFtQjtTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxFQUFFO2dCQUFFLE9BQU8sU0FBUyxDQUFDO1lBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLENBQUMs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