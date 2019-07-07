import { Task } from 'klasa';

interface UnmuteTaskOptions {
    guild: string;
    user: string;
}

export default class extends Task {

    async run({ guild, user }: UnmuteTaskOptions) {
        const _guild = this.client.guilds.get(guild);
        if (!_guild) return;
        const member = await _guild.members.fetch(user).catch(() => null);
        if (!member) return;
        const muteRole = _guild.roles.get(_guild.settings.get('roles.muted')) || _guild.roles.find(r => r.name.toLowerCase() === 'muted');
        if (!muteRole) return;
        await member.roles.remove(muteRole.id);
    }
}
