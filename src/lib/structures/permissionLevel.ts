import { PermissionLevels } from 'klasa';
import { GuildMember, Guild, PermissionString } from 'discord.js';

export default new PermissionLevels()
   .add(0, () => true)
   .add(4, ({ guild, member}) => guild ? true : false && (member as GuildMember).permissions.has('MANAGE_MESSAGES'), { fetch: true })
   .add(5, ({ guild, member}) => guild ? true : false && ['BAN_MEMBERS', 'KICK_MEMBERS'].some(p => (member as GuildMember).permissions.has(p as PermissionString)), { fetch: true })
   .add(6, ({ guild, member}) => guild ? true : false && (member as GuildMember).permissions.has('ADMINISTRATOR'), { fetch: true })
   .add(7, ({ guild, member }) => guild ? true : false && member === (guild as Guild).owner, { fetch: true })
   .add(10, ({ author, client }) => author === client.owner);
