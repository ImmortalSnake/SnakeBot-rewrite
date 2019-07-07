import { Command, CommandStore, KlasaMessage } from 'klasa';
import SnakeBot from '../../lib/client';
import slaps from '../../lib/Data/ts/slaps';
import { GuildMember, MessageEmbed, User } from 'discord.js';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<user:member>',
        });
    }

    public async run(msg: KlasaMessage, [member]: [GuildMember]): Promise<KlasaMessage | KlasaMessage[]> {
        const gif = slaps[Math.floor(Math.random() * slaps.length)];

        return msg.sendEmbed(new MessageEmbed()
            .setColor('ORANGE')
            .setImage(gif)
            .setTitle(`_**${(msg.author as User).username}** slaps **${member.user.username}**._`));
    }
}
