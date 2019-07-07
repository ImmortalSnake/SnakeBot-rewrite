import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { Guild } from 'discord.js';

export default class extends Command {

    constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
        super(client, store, file, dir, {
            aliases: ['setPrefix'],
            cooldown: 5,
            description: 'Change the command prefix the bot uses in your server.',
            permissionLevel: 6,
            usage: '[reset|prefix:str{1,10}]',
        });
    }

    public async run(message: KlasaMessage, [prefix]: [string]) {
        if (!prefix) return message.send(`The prefix for this guild is \`${(message.guild as Guild).settings.get('prefix')}\``);
        if (prefix === 'reset') return this.reset(message);
        if ((message.guild as Guild).settings.get('prefix') === prefix) throw message.language.get('CONFIGURATION_EQUALS');
        await (message.guild as Guild).settings.update('prefix', prefix);
        return message.send(`The prefix for this guild has been set to \`${prefix}\``);
    }

    public async reset(message: KlasaMessage) {
        await (message.guild as Guild).settings.reset('prefix');
        return message.send(`Switched back the guild's prefix back to \`${this.client.options.prefix}\`!`);
    }

}
