import { PermissionLevels } from 'klasa';
import { PermissionString } from 'discord.js';

export default new PermissionLevels()
    // @everyone
    .add(0, () => true)
    // MANAGE_MESSAGES (Mod)
    .add(4, ({ guild, member }) => Boolean(guild) && member!.permissions.has('MANAGE_MESSAGES'), { fetch: true })
    .add(5, ({ guild, member }) => Boolean(guild) && ['BAN_MEMBERS', 'KICK_MEMBERS'].some(p => member!.permissions.has(p as PermissionString)), { fetch: true })
    // Admin Permissions
    .add(6, ({ guild, member }) => Boolean(guild) && member!.permissions.has('ADMINISTRATOR'), { fetch: true })
    .add(7, ({ guild, member }) => Boolean(guild) && member!.id === guild!.owner?.id, { fetch: true })
    .add(10, ({ author, client }) => client.owners.has(author));
