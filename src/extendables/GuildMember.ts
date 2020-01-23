import { Extendable, ExtendableStore } from 'klasa';
import { GuildMember, Role } from 'discord.js';

export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, {
            appliesTo: [GuildMember]
        });

    }

    public get isDJ(this: GuildMember) {
        return this.roles.has((this.guild.settings.get('roles.member') as Role)?.id)
        || this.hasPermission('ADMINISTRATOR');
    }

}
