import { CommandStore, KlasaMessage, Timestamp, KlasaGuild } from 'klasa';
import { GuildMember, MessageEmbed } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public timestamp = new Timestamp('d MMMM YYYY');
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['server-info', 'serverinfo']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const server = (msg.guild as KlasaGuild);
        return msg.sendEmbed(new MessageEmbed()
            .setDescription('**Server Information**')
            .setColor('#15f153')
            .setThumbnail(server.iconURL() ?? '')
            .addField('❯ Server Name', server.name, true)
            .addField('❯ Total Members', server.memberCount, true)
            .addField('❯ Region', server.region, true)
            .addField('❯ Owner', (server.owner as GuildMember).toString(), true)
            .addField('❯ Channels', server.channels.size, true)
            .addField('❯ Emojis', server.emojis.size, true)
            .addField('❯ Created At', this.timestamp.display(server.createdAt), true)
            .addField('❯ Joined At', this.timestamp.display((msg.member as GuildMember).joinedAt as Date), true)
            .addField(`❯ Roles (${server.roles.size})`, Object.values(server.roles).join(' ').slice(0, 1024)));
    }

}
