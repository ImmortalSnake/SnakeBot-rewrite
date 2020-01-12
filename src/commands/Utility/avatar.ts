import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '[user:user]'
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
