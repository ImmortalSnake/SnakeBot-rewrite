import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '[user:user]',
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[]> {
        if (!user) user = msg.author as KlasaUser;
        const Embed = (this.client as SnakeBot).embed(msg, {
            image: user.displayAvatarURL(),
            title: `**${user.username}**`
        });

        return msg.sendEmbed(Embed);
    }
}
