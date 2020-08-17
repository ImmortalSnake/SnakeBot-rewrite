import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import { Role } from 'discord.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['selfroles'],
            usage: '<add|remove|list:default> (role:rolename)',
            requiredPermissions: ['MANAGE_ROLES'],
            subcommands: true
        });

        this.createCustomResolver('rolename', (arg, possible, message, [action]) => {
            if (action === 'list') return arg;
            if (!arg) throw 'Please specify a valid role name or id';
            return this.client.arguments.get('rolename')!.run(arg, possible, message);
        });
    }

    public async list(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const prefix = msg.guildSettings.get('prefix') as string;
        const roleID = msg.guildSettings.get('roles.selfroles') as string[];
        const roles = roleID
            .map(id => msg.guild?.roles.cache.find(role => role.id === id))
            .filter(r => Boolean(r))
            .map(r => `${r} → \`${prefix}selfroles add ${r!.name}\``)
        
        if (!roles.length) throw `No self roles were set for the guild. Ask an admin to use \`${prefix}conf set roles/selfroles <Role ID>\` to add some`;

        return msg.send(new SnakeEmbed(msg)
            .setTitle(`List of self roles [${roles.length}]`)
            .setDescription(`**Use** \`${prefix}selfrole add <Role Name>\` **to give yourself roles**\n\n${roles.join('\n')}`)
            .init());
    }

    public async add(msg: KlasaMessage, [role]: [Role]) {
        const prefix = msg.guildSettings.get('prefix') as string;
        const roles = msg.guildSettings.get('roles.selfroles') as string[];

        if (!roles.includes(role.id)) throw `That role is not available as a self role, use \`${prefix}selfrole\` to see all roles you can add`;
        if (msg.member!.roles.cache.has(role.id)) throw 'You already have that role!';
        if (msg.guild!.me!.roles.highest.comparePositionTo(role) < 1) throw 'This role is higher than mine... Ask an admin to move it below'

        await msg.member!.roles.add(role.id);
        return msg.send(`You have recieved the role **${role.name}**`);
    }

    public async remove(msg: KlasaMessage, [role]: [Role]) {
        const prefix = msg.guildSettings.get('prefix') as string;
        const roles = msg.guildSettings.get('roles.selfroles') as string[];

        if (!roles.includes(role.id)) throw `That role is not available as a self role, use \`${prefix}selfrole\` to see all roles you can add`;
        if (!msg.member!.roles.cache.has(role.id)) throw 'You dont have that role!';
        if (msg.guild!.me!.roles.highest.comparePositionTo(role) < 1) throw 'This role is higher than mine... Ask an admin to move it below'

        await msg.member!.roles.remove(role.id);
        return msg.send(`**${role.name}** was successfully removed from you`);
    }

}
