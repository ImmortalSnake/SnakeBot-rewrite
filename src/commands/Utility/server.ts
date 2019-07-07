import { Command, CommandStore, KlasaMessage, KlasaUser, Timestamp, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';
import { GuildMember, MessageEmbed } from 'discord.js';

export default class extends Command {
    public timestamp = new Timestamp('d MMMM YYYY');

    constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            aliases : ['server-info', 'serverinfo']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const server = (msg.guild as KlasaGuild);
        return msg.sendEmbed(new MessageEmbed()
            .setDescription('**Server Information**')
            .setColor('#15f153')
            .setThumbnail(server.icon as string)
            .addField('❯ Server Name', server.name, true)
            .addField('❯ Total Members', server.memberCount, true)
            .addField('❯ Region', server.region, true)
            .addField('❯ Owner', (server.owner as GuildMember).toString(), true)
            .addField('❯ Channels', server.channels.size, true)
            .addField('❯ Emojis', server.emojis.size, true)
            .addField('❯ Created At', this.timestamp.display(server.createdAt), true)
            .addField('❯ Joined At', this.timestamp.display((msg.member as GuildMember).joinedAt as Date), true)
            .addField('❯ Roles (' + server.roles.size + ')', server.roles.map(r => r).join(''), true));
    }
}
