import { Command, RichDisplay, util, CommandStore, KlasaMessage, ReactionHandler } from 'klasa';
import { MessageEmbed, Permissions, TextChannel, Collection } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

const PERMISSIONS_RICHDISPLAY = new Permissions([Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.ADD_REACTIONS]);
const time = 1000 * 60 * 3;

export default class extends SnakeCommand {

    public handlers: Map<string, ReactionHandler>;
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['commands', 'cmd', 'cmds'],
            runIn: ['text', 'dm'],
            guarded: true,
            description: language => language.get('COMMAND_HELP_DESCRIPTION'),
            usage: '(Command:command|Category:category|page:integer)',
            requiredPermissions: ['EMBED_LINKS', 'ADD_REACTIONS'],
            examples: ['', 'ping', 'music', '2']
        });

        this.createCustomResolver('command', (arg, possible, message) => {
            if (!arg || arg === '') return undefined;
            return this.client.arguments.get('command')!.run(arg, possible, message);
        });

        this.createCustomResolver('category', async (arg, __, msg) => {
            if (!arg) return undefined;
            arg = arg.toLowerCase();
            const commandsByCategory = await this._fetchCommands(msg);

            for (const [page, category] of commandsByCategory.keyArray().entries()) {
                if (category.toLowerCase() === arg) return page + 1;
            }
            return undefined;
        });

        // Cache the handlers
        this.handlers = new Map();
    }

    public async run(msg: KlasaMessage, [input]: [Command | number | undefined]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const prefix = msg.guildSettings.get('prefix') as string;
        if (input instanceof Command) {
            return msg.send(new SnakeEmbed(msg)
                .setTitle(`Command Help - ${util.toTitleCase(input.name)}`)
                .setDescription(`
                **${util.isFunction(input.description) ? input.description(msg.language) : input.description}**

                ${msg.language.get('COMMAND_HELP_USAGE', input.usage.fullUsage(msg))}

                ${msg.language.get('COMMAND_HELP_EXTENDEDHELP')}
                ${util.isFunction(input.extendedHelp) ? input.extendedHelp(msg.language) : input.extendedHelp}

                ${input instanceof SnakeCommand ? `💬 | **Examples**\n${input.displayExamples(prefix)}` : ''}`)
                .init());
        }

        if (!('all' in msg.flagArgs) && msg.guild && (msg.channel as TextChannel).permissionsFor(this.client.user!)!.has(PERMISSIONS_RICHDISPLAY)) {
            // Finish the previous handler
            const previousHandler = this.handlers.get(msg.author.id);
            if (previousHandler) previousHandler.stop();

            try {
                const handler = await (await this.buildDisplay(msg)).run(await msg.send('Loading Commands...') as KlasaMessage, {
                    filter: (_, user) => user.id === msg.author.id,
                    startPage: input,
                    time
                });
                handler.on('end', () => this.handlers.delete(msg.author.id));
                this.handlers.set(msg.author!.id, handler);
            } catch (e) {
                return null;
            }

            return null;
        }

        msg.author.send(await this.buildHelp(msg), { split: { 'char': '\n' } })
            .then(() => { if (msg.channel.type !== 'dm') return msg.sendLocale('COMMAND_HELP_DM'); })
            .catch(() => { if (msg.channel.type !== 'dm') return msg.sendLocale('COMMAND_HELP_NODM'); });

        return null;
    }

    public async buildHelp(message: KlasaMessage) {
        const commands = await this._fetchCommands(message);
        const prefix = message.guildSettings.get('prefix') as string;

        const helpMessage = [];
        for (const [category, list] of commands) {
            helpMessage.push(`**${category} Commands**:\n`, list.map(this.formatCommand.bind(this, message, prefix, false)).join('\n'), '');
        }

        return helpMessage.join('\n');
    }

    public async buildDisplay(message: KlasaMessage) {
        const commands = await this._fetchCommands(message);
        const prefix = message.guildSettings.get('prefix') as string;
        const color = message.member!.displayColor;
        const startEmbed = new SnakeEmbed(message)
            .setTitle('Help')
            .setDescription([
                `**Here are the list of commands available in this bot**`,
                `Use \`${prefix}guide\` to see all the guides on how to use the bot to the fullest`,
                `[Support](https://discord.gg/b8S3HAw)\t[Invite](${this.client.invite})`
            ])
            .init();

        commands.forEach((_, category) => startEmbed.addField(`**${category}**`, `\`${prefix}${this.name} ${category}\``, true));
        const display = new RichDisplay().addPage(startEmbed);

        for (const [category, list] of commands) {
            display.addPage(new MessageEmbed()
                .setTitle(`${category} Commands`)
                .setColor(color)
                .setDescription(list.map(this.formatCommand.bind(this, message, prefix, true)).join('\n')));
        }

        return display;
    }

    private formatCommand(message: KlasaMessage, prefix: string, richDisplay: boolean, command: Command) {
        const description = util.isFunction(command.description) ? command.description(message.language) : command.description;
        return richDisplay ? `• **${prefix}${command.name}** → ${description}` : `• **${prefix}${command.name}** → ${description}`;
    }

    private async _fetchCommands(message: KlasaMessage) {
        const run = this.client.inhibitors.run.bind(this.client.inhibitors, message);
        const commands: Collection<string, Command[]> = new Collection();
        await Promise.all(this.client.commands.map(command => run(command, true)
            .then(() => {
                const category = commands.get(command.category);
                if (category) category.push(command);
                else commands.set(command.category, [command]);
            }).catch(() => {
                // noop
            })));

        return commands;
    }

}
