import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, TextChannel } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<user:member> [reason:...str]',
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage, [user, reason = 'N/A']: [GuildMember, string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const chanID = msg.guildSettings.get('channels.report') as string;
        const reportschan = msg.guild?.channels.cache.get(chanID) as TextChannel;
        if (!reportschan) throw msg.language.get('COMMAND_REPORT_NO_CHANNEL', msg.guildSettings.get('prefix'));

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
