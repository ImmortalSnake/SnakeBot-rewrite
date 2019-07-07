import { Command, CommandStore, KlasaMessage, KlasaGuild, Timestamp } from 'klasa';
import SnakeBot from '../../lib/client';
const ms = require('ms');

export default class extends Command {

    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<id:int> <reason:string>',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [ID, reason]: [number, string]): Promise<KlasaMessage | KlasaMessage[]>  {
        const cases = (msg.guild as KlasaGuild).settings.get('modlogs.cases');
        const Case = cases.find((c: any) => c.id === ID);
        if (!Case) return msg.sendMessage('Could not find a case with that ID');

        await (msg.guild as KlasaGuild).settings.update('modlogs.cases', Case, { action: 'remove' });
        Case.reason = reason;
        await (msg.guild as KlasaGuild).settings.update('modlogs.cases', Case, { action: 'add' });

        const mod = await this.client.users.fetch(Case.moderator);
        const user = await this.client.users.fetch(Case.user);

        const embed = (this.client as SnakeBot).embed(msg, {
            description: `Reason: \`${Case.reason}\``,
            title: `${Case.type} Case #${Case.id}`
        })
        .addField('Moderator', mod ? mod.tag : Case.moderator, true)
        .addField('Punished User', user ? user.tag : Case.user, true)
        .setFooter('At')
        .setTimestamp(Case.time);

        if (Case.duration) embed.addField('Duration', ms(Case.duration, { long: true }), true);
        return msg.sendEmbed(embed);
    }
}
