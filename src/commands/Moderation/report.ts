import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, TextChannel } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['MANAGE_GUILD']
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const reportschan = msg.guildSettings.get('channels.reports') as TextChannel;
        if (!reportschan) throw `Could not find a reports channel for this server`;

        await reportschan.send(new SnakeEmbed(msg)
            .setDescription(reason)
            .setTitle('Reports')
            .addField('Reporter', msg.author.toString())
            .addField('Channel', msg.channel.toString())
            .addField('Reported User', user.toString()));

        await msg.delete();
        return null;
    }

}
