import { Monitor, MonitorStore, KlasaMessage, Duration } from 'klasa';
import { TextChannel } from 'discord.js';

export default class extends Monitor {

    public constructor(store: MonitorStore, file: string[], directory: string) {
        super(store, file, directory, {
            ignoreOthers: false,
            ignoreEdits: false
        });
    }

    public async run(msg: KlasaMessage) {
        if (!msg.guild || !(msg.channel as TextChannel).postable) return;
        const isAFK = msg.author.settings.get('afk.time');

        if (isAFK) {
            await msg.author.settings.reset(['afk.time', 'afk.reason']);
            await msg.sendLocale('MONITOR_AFK_REMOVE', [msg.author.toString()])
                .then(m => m.delete({ timeout: 10000 }));
        }

        for (const user of msg.mentions.users.values()) {
            const afk = user.settings.get('afk') as AFKSettings;
            if (afk.time) return msg.sendLocale('MONITOR_AFK_USER', [user.tag, Duration.toNow(afk.time), afk.reason]);
        }

    }

}

interface AFKSettings {
    reason?: string;
    time?: number;
}
