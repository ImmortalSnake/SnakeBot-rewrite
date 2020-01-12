import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { Collection, GuildMember, Snowflake, User, Message } from 'discord.js';

export default class AFKMonitor extends Monitor {

    public constructor(store: MonitorStore, file: string[], directory: string) {
        super(store, file, directory, {
            ignoreOthers: false
        });
    }

    public async run(msg: KlasaMessage): Promise<undefined | Message | Message[]> {
        if (!msg.guild) return;
        const afkusers = msg.guild.settings.get('afkusers') as any[];
        for (const user of afkusers) {
            if ((msg.author as User).id === (user as any).id) {
                const afk = afkusers.find(a => a.id === (msg.author as User).id);
                await msg.guild.settings.update('afkusers', afk, { arrayAction: 'remove' });
                return msg.channel.send(`Welcome back ${(msg.author as User).toString()}! I have removed your AFK`);
            } else if ((msg.mentions.members as Collection<Snowflake, GuildMember>).has((user as any).id)) {
                const _user = this.client.users.get((user as any).id) as User;
                const afk = afkusers.find(a => a.id === _user.id);
                return msg.channel.send(`${_user.tag} is currently afk with reason: ${afk.reason}`);
            }
        }
    }

}
