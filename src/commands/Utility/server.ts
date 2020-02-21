import { CommandStore, KlasaMessage, Timestamp } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public timestamp = new Timestamp('d MMMM YYYY');
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['server-info', 'serverinfo']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        return msg.sendEmbed(new SnakeEmbed(msg)
            .setDescription('**Server Information**')
            .setThumbnail(msg.guild!.iconURL() ?? '')
            .addField('❯ Server Name', msg.guild!.name, true)
            .addField('❯ Total Members', msg.guild!.memberCount, true)
            .addField('❯ Region', msg.guild!.region, true)
            .addField('❯ Owner', msg.guild!.owner!.toString(), true)
            .addField('❯ Channels', msg.guild!.channels.size, true)
            .addField('❯ Emojis', msg.guild!.emojis.size, true)
            .addField('❯ Created At', this.timestamp.display(msg.guild!.createdAt), true)
            .addField(`❯ Roles (${msg.guild!.roles.size})`, Object.values(msg.guild!.roles).join(' ').slice(0, 1024))
            .init());
    }

}
