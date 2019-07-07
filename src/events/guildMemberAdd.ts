import { Event } from 'klasa';
import { GuildMember, TextChannel } from 'discord.js';

export default class GuildMemberAddEvent extends Event {

    private regex = (type: string) => new RegExp(`\{\{(${type}+)\}\}`, 'igm');

    public async run (member: GuildMember) {
        const welcomeChan = member.guild.channels.get(member.guild.settings.get('channel.welcome')) as TextChannel;
        if (welcomeChan) {
            let welcomeMess = member.guild.settings.get('message.welcome') || 'Hi {{user}} welcome to {{guild}}';
            welcomeMess = this.format(welcomeMess, member);
            welcomeChan.send(welcomeMess);
        }
    }

    private format(mess: string, member: GuildMember): string {
        return mess
            .replace(this.regex('member'), member.toString())
            .replace(this.regex('guild'), member.guild.name);
    }
}
