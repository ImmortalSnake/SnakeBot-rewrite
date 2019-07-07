import { Command, CommandStore, KlasaClient, KlasaMessage, util, SchemaFolder, KlasaGuild} from 'klasa';
import { Guild } from 'discord.js';

export default class extends Command {

    constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
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
            if (action === 'show' || arg) return arg;
            throw message.language.get('COMMAND_CONF_NOKEY');
        })
        .createCustomResolver('value', (arg, possible, message, [action]) => {
            if (!['set', 'remove'].includes(action) || arg) return arg;
            throw message.language.get('COMMAND_CONF_NOVALUE');
        });
    }

    async show(msg: KlasaMessage, [key, value]: string[]) {
        const path = this.client.gateways.guilds.getPath(key, { avoidUnconfigurable: true, errors: false, piece: false });
        if (!path) return msg.sendLocale('COMMAND_CONF_GET_NOEXT', [key]);
        if (path.piece.type === 'Folder') {
            return msg.sendLocale('COMMAND_CONF_SERVER', [
                key ? `: ${key.split('.').map(util.toTitleCase).join('/')}` : '',
                util.codeBlock('asciidoc', (msg.guild as KlasaGuild).settings.list(msg, path.piece as unknown as SchemaFolder))
            ]);
        }
        return msg.sendLocale('COMMAND_CONF_GET', [path.piece.path, (msg.guild as KlasaGuild).settings.resolveString(msg, path.piece)]);
    }

    async set(msg: KlasaMessage, [key, ...value]: string[]) {
        const status = await (msg.guild as KlasaGuild).settings.update(key, value.join(' '), (msg.guild as Guild), { avoidUnconfigurable: true, action: 'add' });
        return this.check(msg, key, status) || msg.sendLocale('COMMAND_CONF_UPDATED', [key, (msg.guild as KlasaGuild).settings.resolveString(msg, status.updated[0].piece)]);
    }

    async remove(msg: KlasaMessage, [key, ...value]: string[]) {
        const status = await (msg.guild as KlasaGuild).settings.update(key, value.join(' '), (msg.guild as Guild), { avoidUnconfigurable: true, action: 'remove' });
        return this.check(msg, key, status) || msg.sendLocale('COMMAND_CONF_UPDATED', [key, (msg.guild as KlasaGuild).settings.resolveString(msg, status.updated[0].piece)]);
    }

    check(msg: KlasaMessage, key: string, { errors, updated }: any) {
        if (errors.length) return msg.sendMessage(String(errors[0]));
        if (!updated.length) return msg.sendLocale('COMMAND_CONF_NOCHANGE', [key]);
        return null;
    }
}
