import { CommandStore, KlasaMessage, Timestamp, KlasaGuild } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

const verification = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];
const regions: Record<string, string> = {
    'brazil': ' :flag_br:',
    'europe': ':flag_eu:',
    'hongkong': ':flag_hk:',
    'india': ':flag_in:',
    'japan': ':flag_jp:',
    'russia': ':flag_ru:',
    'singapore': ':flag_sg:',
    'southafrica': ':flag_za:',
    'sydney': ':flag_au:',
    'us-central': ':flag_us:',
    'us-east': ':flag_us:',
    'us-south': ':flag_us:',
    'us-west': ':flag_us:'
};

export default class extends SnakeCommand {

    public timestamp = new Timestamp('d MMMM YYYY');
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['server-info', 'serverinfo']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const { channels, bots, total } = this.stats(msg.guild!);

        return msg.sendEmbed(new SnakeEmbed(msg)
            .setThumbnail(msg.guild!.iconURL() ?? '')
            .addField('Server Information', `
            **❯ Server Name**   : \`${msg.guild!.name}\`
            **❯ Server ID**     : \`${msg.guild!.id}\`
            **❯ Server Owner**  : ${msg.guild!.owner}
            **❯ Server Region** : ${msg.guild!.region} ${regions[msg.guild!.region] || ''}
            **❯ Verification**  : **${verification[msg.guild!.verificationLevel]}**
            **❯ Created At**    : ${this.timestamp.display(msg.guild!.createdAt)}
            `)
            .addField('Statistics', `
            **❯ Member Count**  : **${total}** Total | **${total - bots}** Users | **${bots}** Bots 
            **❯ Channels**      : **${msg.guild!.channels.size}** Total | **${channels.text}** Text | **${channels.voice}** Voice | **${channels.categories}** Categories
            **❯ Emojis**        : **${msg.guild!.emojis.size}** Total
            **❯ Roles**         : **${msg.guild!.roles.size}** Total`)
            .init());
    }

    private stats(guild: KlasaGuild) {
        const channels = { voice: 0, text: 0, categories: 0 };
        for (const chan of guild.channels.values()) {
            if (chan.type === 'voice') channels.voice++;
            else if (chan.type === 'text') channels.text++;
            else channels.categories++;
        }

        return {
            total: guild.memberCount,
            bots: guild.members.filter(m => m.user.bot).size,
            channels
        };
    }

}
