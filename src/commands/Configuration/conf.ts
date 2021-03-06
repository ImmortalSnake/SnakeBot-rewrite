import { util, CommandStore, KlasaMessage, SettingsUpdateResult, SchemaFolder, SchemaPiece, Schema, Settings, KlasaGuild } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            permissionLevel: 6,
            aliases: ['config'],
            guarded: true,
            subcommands: true,
            requiredPermissions: ['EMBED_LINKS'],
            description: language => language.get('COMMAND_CONF_SERVER_DESCRIPTION'),
            usage: '<set|remove|reset|show:default> (key:key) (value:value)',
            examples: ['', 'prefix', 'set prefix s!', 'music/volume']
        });

        this
            .createCustomResolver('key', (arg, __, msg, [action]) => {
                if (action === 'show' || arg) return arg?.toLowerCase().replace('/', '.');
                throw msg.language.get('COMMAND_CONF_NOKEY');
            })
            .createCustomResolver('value', (arg, possible, msg, [action]) => {
                if (!['set', 'remove'].includes(action)) return null;
                if (arg) return this.client.arguments.get('...string')!.run(arg, possible, msg);
                throw msg.language.get('COMMAND_CONF_NOVALUE');
            });
    }

    public async show(msg: KlasaMessage, [key = '']: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const entry = this.getPath(key);
        const prefix = msg.guildSettings.get('prefix');

        if (!entry || (entry.type === 'Folder' ? !(entry as SchemaFolder).configurableKeys.length : !(entry as SchemaPiece).configurable)) return msg.sendLocale('COMMAND_CONF_GET_NOEXT', [key]);
        const path = entry.path.split('.').map((x: any) => util.toTitleCase(x)).join('/');
        const display = this.display(msg.guildSettings, msg, entry);

        if (entry.type === 'Folder') {
            return msg.sendLocale('COMMAND_CONF_SHOW', [path], {
                embed: new SnakeEmbed(msg)
                    .setLocaleDescription('COMMAND_CONF_SHOW_DESCRIPTION', prefix, path, display)
                    .init()
            });
        }

        return msg.send(new SnakeEmbed(msg)
            .setTitle(path)
            .setLocaleDescription('COMMAND_CONF_GET', prefix, path, entry, display)
            .init());
    }

    public async set(msg: KlasaMessage, [key, valueToSet]: [string, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const entry = this.check(msg, key, await msg.guildSettings.update(key, valueToSet, msg.guild as KlasaGuild, { avoidUnconfigurable: true, action: 'add' }));
        return msg.sendLocale('COMMAND_CONF_UPDATED', [key, entry]);
    }

    public async remove(msg: KlasaMessage, [key, valueToRemove]: [string, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const entry = this.check(msg, key, await msg.guildSettings.update(key, valueToRemove, { avoidUnconfigurable: true, action: 'remove' }));
        return msg.sendLocale('COMMAND_CONF_UPDATED', [key, entry]);
    }

    public async reset(msg: KlasaMessage, [key]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const entry = this.check(msg, key, await msg.guildSettings.reset(key));
        return msg.sendLocale('COMMAND_CONF_RESET', [key, entry]);
    }

    private check(msg: KlasaMessage, key: string, { errors, updated }: SettingsUpdateResult) {
        if (errors.length) throw String(errors[0]);
        if (!updated.length) throw msg.language.get('COMMAND_CONF_NOCHANGE', key);
        return updated[0].data;
    }

    private getPath(key?: string): SchemaFolder | Schema | SchemaPiece | null {
        const { schema } = this.client.gateways.guilds;
        if (!key) return schema;
        try {
            return key.split('.').reduce((folder, key) => [...folder!.values()].find(p => p.key.toLowerCase() === key) as SchemaFolder, schema);
        } catch (__) {
            return null;
        }
    }

    private display(settings: Settings, msg: KlasaMessage, entry: SchemaFolder | Schema | SchemaPiece): string {
        if (entry instanceof SchemaPiece) {
            const value = settings.get(entry.path);
            if (value === null) return 'Not set';
            if (entry.array) return (value as any[]).length ? `[${(value as any[]).map(x => entry.serializer.stringify(x, msg)).join(' | ')}]` : 'Not set';
            return entry.serializer.stringify(value, msg);
        }

        const folders = [];
        const keys = [];
        for (const [key, value] of entry.entries()) {
            if (value instanceof SchemaFolder) {
                if (value.configurableKeys.length) folders.push(`📁 **${util.toTitleCase(key)}**`);
            } else if (value.configurable) {
                keys.push(`🔸 **${util.toTitleCase(key)}**`);
            }
        }

        return `${folders.length ? `${folders.join('\n')}\n\n` : ''}${keys.join('\n')}`;
    }

}
