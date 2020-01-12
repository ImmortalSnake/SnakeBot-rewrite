import { CommandStore, KlasaMessage, KlasaGuild, KlasaUser, RichDisplay } from 'klasa';
import { MessageEmbed, ClientUser, User } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['modlogs'],
            usage: '[user:user]',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [user]: [KlasaUser]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const cases = msg.guildSettings.get('modlogs.cases') as any[];
        if (user) cases.filter((c: any) => c.user === user.id);

        if (cases.length === 0) throw `No cases were found for this ${user ? 'user' : 'guild'}`;

        const display = new RichDisplay(new MessageEmbed()
            .setTitle(`Modlogs for ${user ? user.tag : (msg.guild as KlasaGuild).name}`)
            .setColor('#2f62b5')
            .setAuthor((this.client.user as ClientUser).username, (this.client.user as ClientUser).displayAvatarURL()));

        for (let i = 0; i < cases.length; i++) {
            if (i % 10 === 0) {
                const lst = cases.slice(i).slice(0, 10);
                display.addPage((template: MessageEmbed) => {
                    lst.forEach((c: any) => template.addField(`${c.type} Case #${c.id}`, `${this.client.users.has(c.user) ? `${(this.client.users.get(c.user) as User).tag} ` : ''}\`${c.reason.slice(0, 200)}\``));
                    return template;
                });
            }
        }

        await display.run(await msg.send('Loading modlogs...') as KlasaMessage);
        return null;
    }

}
