import { Task } from 'klasa';

interface UnmuteTaskOptions {
    guild: string;
    user: string;
}

export default class extends Task {

    public async run({ guild, user }: UnmuteTaskOptions) {
        const _guild = this.client.guilds.cache.get(guild);
        if (!_guild) return;
        const member = await _guild.members.fetch(user).catch(() => null);
        if (!member) return;
        const muteRole = member.roles.cache.get(_guild.settings.get('roles.muted') as string) || member.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        if (!muteRole) return;
        await member.roles.remove(muteRole.id).catch(() => null);
    }

}
