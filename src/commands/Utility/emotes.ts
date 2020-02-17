import { KlasaMessage, RichDisplay, util } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import { MessageEmbed } from 'discord.js';

export default class extends SnakeCommand {

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const { emojis } = msg.guild!;
        const display = new RichDisplay(new SnakeEmbed(msg).init()
            .setAuthor(`${emojis.size} emojis in ${msg.guild!.name}`, msg.guild!.iconURL()!));

        for (const lst of util.chunk(emojis.array(), 50)) {
            display.addPage((template: MessageEmbed) => template.setDescription(lst.join(' ')));
        }

        const response = await msg.send('Loading...');
        await display.run(response);
        return response;
    }

}
