import { CommandStore, KlasaMessage, KlasaGuild } from 'klasa';
import SnakeBot from '../../lib/client';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import Util from '../../lib/utils/Util';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<id:int> <reason:string>',
            requiredPermissions: ['MANAGE_GUILD'],
            permissionLevel: 5
        });
    }

    public async run(msg: KlasaMessage, [ID, reason]: [number, string]): Promise<KlasaMessage | KlasaMessage[]> {
        const cases = msg.guildSettings.get('modlogs.cases') as any[];
        const Case = cases.find((c: any) => c.id === ID);
        if (!Case) return msg.sendMessage('Could not find a case with that ID');

        await (msg.guild as KlasaGuild).settings.update('modlogs.cases', Case, { arrayAction: 'remove' });
        Case.reason = reason;
        await (msg.guild as KlasaGuild).settings.update('modlogs.cases', Case, { arrayAction: 'add' });

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

        if (Case.duration) embed.addField('Duration', Util.msToDuration(Case.duration), true);
        return msg.sendEmbed(embed);
    }

}
