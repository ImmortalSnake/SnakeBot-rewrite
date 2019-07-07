import { Command, CommandStore, KlasaMessage, KlasaUser, Timestamp } from 'klasa';
import SnakeBot from '../../lib/client';
import { GuildMember } from 'discord.js';

export default class extends Command {
    public timestamp = new Timestamp('d MMMM YYYY');

    constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '[member:member]',
        });
    }

    public async run(msg: KlasaMessage, [member]: [GuildMember]): Promise<KlasaMessage | KlasaMessage[]> {
        if (!member) member = msg.member as GuildMember;
        const Embed = (this.client as SnakeBot).embed(msg, {
            thumbnail: member.user.displayAvatarURL(),
            title: `**${member.user.username}**`,
            color: member.displayHexColor
        })
        .addField('❯ Name', member.displayName, true)
        .addField('❯ ID', member.id, true)
        .addField('❯ Discord Join Date', this.timestamp.display(member.user.createdAt), true)
        .addField('❯ Server Join Date', this.timestamp.display(member.joinedTimestamp as number), true)
        .addField('❯ Playing', member.presence.activity ? member.presence.activity.name : 'N/A', true)
        .addField('❯ Highest Role', member.roles.size > 1 ? member.roles.highest.name : 'None', true)
        .addField('❯ Bot?', member.user.bot ? 'Yes' : 'No', true);

        return msg.sendEmbed(Embed);
    }
}
