import { CommandStore, KlasaMessage, Timestamp } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { User, MessageEmbed, GuildMember } from 'discord.js';

export default class extends SnakeCommand {

    public timestamp = new Timestamp('d MMMM YYYY');
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[user:user]',
            requiredPermissions: ['EMBED_LINKS'],
            examples: ['@ImmortalSnake#0449', '']
        });
    }

    public async run(msg: KlasaMessage, [userMember]: [User | GuildMember | undefined]): Promise<KlasaMessage | KlasaMessage[]> {
        const member = userMember ? msg.guild?.member(userMember) : msg.member;
        const user = member ? member.user : (userMember as User) || msg.author;

        const embed = new MessageEmbed()
            .setThumbnail(user.displayAvatarURL())
            .setTitle(user.tag)
            .addField('General Information', [
                `❯ **ID:** \`${user.id}\``,
                `❯ **Discord Join Date:** \`${this.timestamp.display(user.createdAt)}\``,
                `❯ **Status:** \`${user.presence.status}\``,
                `❯ **Game:** \`${user.presence.activities[0]?.name || 'None'}\``,
                `❯ **Bot?** \`${user.bot ? 'Yes' : 'No'}\``
            ].join('\n'));

        if (member) {
            embed.setColor(member.displayHexColor)
                .addField('Member Information', [
                    `❯ **Nickname:** \`${member.displayName}\``,
                    `❯ **Server Join Date:** \`${this.timestamp.display(member.joinedTimestamp!)}\``,
                    `❯ **Highest Role:** ${member.roles.highest}`
                ])
                .addField(`Roles (${member.roles.size})`, [...member.roles.values()]
                    .sort((a, b) => b.comparePositionTo(a)).slice(1).join('|')
                    .slice(0, 1000) || 'None');
        }

        return msg.sendEmbed(embed);
    }

}
