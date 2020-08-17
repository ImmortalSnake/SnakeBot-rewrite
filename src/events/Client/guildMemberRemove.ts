import { Event } from 'klasa';
import { GuildMember, TextChannel } from 'discord.js';

export default class GuildMemberAddEvent extends Event {

    public async run(member: GuildMember) {
        const chanID = member.guild.settings.get('channels.leave') as string;
        const leaveChan = member.guild.channels.cache.get(chanID) as TextChannel;

        if (leaveChan && leaveChan.postable) {
            const leaveMess = this.format(
                member.guild.settings.get('message.leave') as string,
                member
            );

            await leaveChan.send(leaveMess).catch();
        }
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
