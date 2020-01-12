import { Guild, TextChannel } from 'discord.js';
import { ShoukakuPlayer, Track } from 'shoukaku';
import AudioManager from './manager';

interface DispatcherOptions {
    manager: AudioManager;
    guild: Guild;
    chan: TextChannel;
    player: ShoukakuPlayer;
}

export default class LavaDispatcher {

    public manager: AudioManager;
    public guild: Guild;
    public text: TextChannel;
    public player: ShoukakuPlayer;
    public queue: Track[];
    public current: null | Track;

    public constructor(options: DispatcherOptions) {

        this.manager = options.manager;
        this.guild = options.guild;
        this.text = options.chan;
        this.player = options.player;
        this.queue = [];
        this.current = null;

        this.player.on('end', () => this.play().catch(p => this.onClean(p)));
        this.player.on('closed', p => this.onClean(p));
        this.player.on('error', p => this.onClean(p));
        this.player.on('nodeDisconnect', p => this.onClean(p));
    }

    public get exists() {
        return this.manager.queue.has(this.guild.id);
    }

    public onClean(param: any) {
        if (param instanceof Error || param instanceof Object) console.error(param);

        this.queue.length = 0;
        this.leave();
    }

    public async play() {
        if (!this.exists || !this.queue.length) return this.leave();

        this.current = this.queue.shift()!;
        await this.player.playTrack(this.current.track);
        await this.text.send(`Now Playing: **${this.current.info.title}**`).catch(() => null);
    }

    public leave(log?: string) {
        if (log) console.log(log);

        this.queue.length = 0;
        this.player.disconnect();
        this.manager.queue.delete(this.guild.id);

        this.text.send('Left the channel due to empty queue.').catch(() => null);
    }

}
