import { Extendable, ExtendableStore } from 'klasa';
import { GuildMember, Role } from 'discord.js';

export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, {
            appliesTo: [GuildMember]
        });

    }

    public get isDJ(this: GuildMember) {
        return this.hasPermission('ADMINISTRATOR') || (this.guild.settings.get('roles.dj') as Role[]).some(r => this.roles.has(r.id));
    }

}
