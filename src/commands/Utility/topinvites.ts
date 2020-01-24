import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { CommandStore, KlasaMessage, RichDisplay, util } from 'klasa';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import { Invite } from 'discord.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['topinv'],
            requiredPermissions: ['MANAGE_GUILD'],
            cooldown: 10
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        const invites = await msg.guild!.fetchInvites();
        const top = invites
            .filter(invite => Boolean(invite && invite.uses! > 0 && invite.inviter))
            .sort((a, b) => b.uses! - a.uses!)
            .first(15);

        await this.buildDisplay(msg, top).run(await msg.send('Loading...'));
        return null;
    }

    private buildDisplay(msg: KlasaMessage, invites: Invite[]) {
        const display = new RichDisplay(new SnakeEmbed(msg)
            .setTitle(`Top Invites for ${msg.guild!.name}`));

        for (const inv of util.chunk(invites, 3)) {
            display.addPage((embed: SnakeEmbed) => embed
                .setThumbnail(msg.guild!.iconURL() || '')
                .setDescription(
                    inv.map((invite, i) => `**[${i + 1}]** ${invite.inviter!.tag} | \`${invite.uses}\` **Uses** | [${invite.code}](${invite.url}) | ${invite.channel.toString()}`)
                        .join('\n')
                ));
        }

        return display;
    }

}
