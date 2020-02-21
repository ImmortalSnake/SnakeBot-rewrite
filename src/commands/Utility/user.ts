import { CommandStore, KlasaMessage, Timestamp } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { User, MessageEmbed, GuildMember } from 'discord.js';

export default class extends SnakeCommand {

    public timestamp = new Timestamp('d MMMM YYYY');
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[user:user]',
            examples: ['@ImmortalSnake#0449', '']
        });
    }

    public async run(msg: KlasaMessage, [userMember]: [User | GuildMember | undefined]): Promise<KlasaMessage | KlasaMessage[]> {
        const member = userMember ? msg.guild?.member(userMember) : msg.member;
        const user = member ? member.user : (userMember as User) || msg.author;

        const embed = new MessageEmbed()
            .setThumbnail(user.displayAvatarURL())
            .setTitle(user.username)
            .addField('❯ ID', user.id, true)
            .addField('❯ Discord Join Date', this.timestamp.display(user.createdAt), true)
            .addField('❯ Status', user.presence.status, true)
            .addField('❯ Bot?', user.bot ? 'Yes' : 'No', true);

        if (member) {
            embed.setColor(member.displayHexColor)
                .addField('❯ Nickname', member.displayName, true)
                .addField('❯ Server Join Date', this.timestamp.display(member.joinedTimestamp as number), true)
                .addField(`❯ Roles (${member.roles.size})`, Object.values(member.roles).sort().slice(0, 10)
                    .join(' '));
        }

        return msg.sendEmbed(embed);
    }

}
