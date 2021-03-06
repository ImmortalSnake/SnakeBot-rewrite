import { Event } from 'klasa';
import { GuildMember, TextChannel } from 'discord.js';

export default class GuildMemberAddEvent extends Event {

    public async run(member: GuildMember) {
        const chanID = member.guild.settings.get('channels.welcome') as string;
        const welcomeChan = member.guild.channels.cache.get(chanID) as TextChannel;
        const welcomeRoles = member.guild.settings.get('roles.auto') as string[];

        if (welcomeChan && welcomeChan.postable) {
            const welcomeMess = this.format(
                member.guild.settings.get('message.welcome') as string,
                member
            );

            await welcomeChan.send(welcomeMess).catch();
        }
        if (welcomeRoles.length && member.guild.me?.hasPermission('MANAGE_ROLES')) await member.roles.add(welcomeRoles).catch();
    }

    private regex = (type: string) => new RegExp(`\{([${type}]+)\}`, 'igm');

    private format(mess: string, member: GuildMember): string {
        return mess
            .replace(this.regex('member|user|mention'), member.toString())
            .replace(this.regex('guild|server'), member.guild.name)
            .replace(this.regex('guildid|serverid'), member.guild.id)
            .replace(this.regex('membername|username'), member.user.username)
            .replace(this.regex('membertag|usertag'), member.user.tag)
            .replace(this.regex('userid|id'), member.id)
            .replace(this.regex('members|count|size'), member.guild.memberCount.toString());
    }

}
