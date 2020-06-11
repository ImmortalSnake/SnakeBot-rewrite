import { KlasaMessage } from 'klasa';
import SnakeEmbed from './SnakeEmbed';
import { User, TextChannel } from 'discord.js';
import Util from '../utils/Util';
import { COLORS } from '../utils/constants';

export type ModLogAction = 'Ban' | 'Kick' | 'Mute' | 'Purge' | 'Softban' | 'Unban' | 'Unmute' | 'Warn';
export default class ModLog {

    public readonly message: KlasaMessage;
    public readonly action: ModLogAction;
    public user?: User;
    public duration?: number;
    public reason?: string;
    public id?: number;
    public timestamp?: number;

    public constructor(msg: KlasaMessage, action: ModLogAction) {
        this.message = msg;
        this.action = action;
    }

    public get moderator() {
        return this.message.member!;
    }

    public get client() {
        return this.message.client;
    }

    public get data() {
        return {
            id: this.id,
            timestamp: this.timestamp,
            action: this.action,
            reason: this.reason,
            duration: this.duration,
            user: this.user ? { id: this.user.id, tag: this.user.tag } : null,
            moderator: { id: this.moderator.id, tag: this.moderator.user.tag }
        };
    }

    public get renderEmbed() {
        const user = this.user || this.moderator.user!;
        const prefix = this.message.guildSettings.get('prefix');
        const description = [`**Moderator:** ${this.moderator.toString()} (${this.moderator.id})`];

        if (this.user) description.push(`**User:** ${this.user.toString()} (${this.user.id})`);
        if (this.duration) description.push(`**Duration:** ${Util.msToDuration(this.duration)}`);
        description.push(`**Reason:** ${this.reason || `N/A (Use \`${prefix}reason ${this.id}\`) to set a reason`}`);

        return new SnakeEmbed(this.message)
            .setColor(COLORS.MODLOG[this.action!])
            .setAuthor(`Moderation: ${this.action} | [Case: ${this.id}]`, user.displayAvatarURL())
            .setDescription(description.join('\n'))
            .setFooter(this.client.user!.tag, this.client.user!.displayAvatarURL())
            .setTimestamp(this.timestamp);
    }

    public setUser(user?: User) {
        this.user = user;
        return this;
    }

    public setDuration(duration?: number) {
        this.duration = duration;
        return this;
    }

    public setReason(reason?: string) {
        this.reason = reason;
        return this;
    }

    public async save() {
        const cases = this.message.guildSettings.get('modlogs') as ModLogData[];
        this.id = cases.length + 1;
        this.timestamp = Date.now();

        const { errors } = await this.message.guildSettings.update('modlogs', this.data, { action: 'add' });
        if (errors.length) throw errors[0];

        return this.send();
    }

    public async send() {
        const [modlogChan] = await this.message.guildSettings.get('channels.modlog') as [TextChannel];
        if (modlogChan) return modlogChan.send(this.renderEmbed);
        return null;
    }

    public static renderRawEmbed(msg: KlasaMessage, log: ModLogData) {
        const prefix = msg.guildSettings.get('prefix');
        const description = [`**Moderator:** ${log.moderator.tag} (${log.moderator.id})`];

        if (log.user) description.push(`**User:** ${log.user?.tag} (${log.user.id})`);
        if (log.duration) description.push(`**Duration:** ${Util.msToDuration(log.duration)}`);
        description.push(`**Reason:** ${log.reason || `N/A (Use \`${prefix}reason ${log.id}\`) to set a reason`}`);

        return new SnakeEmbed(msg)
            .setColor(COLORS.MODLOG[log.action])
            .setTitle(`${log.action} | Case: ${log.id}`)
            .setDescription(description)
            .setFooter(msg.client.user!.tag, msg.client.user!.displayAvatarURL())
            .setTimestamp(log.timestamp);
    }

}

export interface ModLogData {
    id: number;
    timestamp: number;
    action: ModLogAction;
    reason?: string;
    duration?: number;
    user?: UserData;
    moderator: UserData;
}

interface UserData {
    id: string;
    tag: string;
}
