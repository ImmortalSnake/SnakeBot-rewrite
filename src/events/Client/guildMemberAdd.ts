import { Event } from 'klasa';
import { GuildMember, TextChannel, Role } from 'discord.js';

export default class GuildMemberAddEvent extends Event {

    public async run(member: GuildMember) {
        const welcomeChan = member.guild.channels.get(member.guild.settings.get('channel.welcome') as string) as TextChannel;
        const welcomeRole = member.guild.settings.get('roles.auto') as Role;
        if (welcomeChan) {
            const welcomeMess = this.format(
                member.guild.settings.get('message.welcome') as string || 'Hi {{user}} welcome to {{guild}}',
                member
            );

            await welcomeChan.send(welcomeMess).catch();
        }
        if (welcomeRole && member.guild.me?.hasPermission('MANAGE_ROLES')) await member.roles.add(welcomeRole);
    }

    private regex = (type: string) => new RegExp(`\{\{(${type}+)\}\}`, 'igm');

    private format(mess: string, member: GuildMember): string {
        return mess
            .replace(this.regex('member'), member.toString())
            .replace(this.regex('guild'), member.guild.name)
            .replace(this.regex('membername'), member.user.username)
            .replace(this.regex('membertag'), member.user.tag);
    }

}
