import { Minute, Second, Hour, Day } from './constants';
import fetch from 'node-fetch';
import { KlasaMessage, KlasaUser } from 'klasa';
import { ImageSize } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default abstract class Util {

    public static readonly number_string = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine'
    ];

    public static comma(num: number) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    public static choice<T>(arr: Array<T>): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    public static formatTime(syncTime: string, asyncTime?: string): string {
        return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
    }

    public static async getHaste(evalResult: string, language: string): Promise<string> {
        const key = await fetch('https://hasteb.in/documents', { method: 'POST', body: evalResult })
            .then(response => response.json())
            .then(body => body.key);
        return `https://hasteb.in/${key}.${language}`;
    }

    public static isURL(url: string) {
        try {
            return Boolean(new URL(url));
        } catch (__) {
            return false;
        }
    }

    public static msToDuration(duration: number): string {
        const { seconds, minutes, hours, days } = this.extractDuration(duration);

        let mess = '';
        if (days) mess += `**${days}** day${days > 1 ? 's' : ''} `;
        if (hours) mess += `**${hours}** hour${hours > 1 ? 's' : ''} `;
        if (minutes) mess += `**${minutes}** minute${minutes > 1 ? 's' : ''} `;
        if (seconds) mess += `**${seconds}** second${seconds > 1 ? 's' : ''} `;

        return mess;
    }

    public static formatDuration(duration: number) {
        const { seconds, minutes, hours } = this.extractDuration(duration);

        return `${(hours < 10) ? `0${hours}` : hours}:${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
    }

    public static shuffle<T>(arr: T[]): T[] {
        for (let i = arr.length; i; i--) {
            const j = Math.floor(Math.random() * i);
            [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
        }
        return arr;
    }

    public static stripIndents(string: string) {
        return string.replace(/^(\s+)\gm/, '');
    }

    public static removeCodeBlock(str: string) {
        const regex = /^```(.*)\n((?:\n|.)*)```$/;
        return regex.test(str) ? str.match(regex)?.slice(1) : null;
    }

    public static async getImage(msg: KlasaMessage, { user, size = 512 }: ImageOptions = {}): Promise<Buffer> {
        if (user) return user.fetchAvatar(size);
        const messages = await msg.channel.messages.fetch();

        const attachments = messages.filter(m => m.attachments.size > 0)
            .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
            .map(m => m.attachments.first()!);

        let image: Buffer | null = null;
        for (const att of attachments) {
            const img = await fetch(att.url).then(res => res.buffer()).catch();
            if (img) {
                image = img;
                break;
            }
        }

        return image || msg.author.fetchAvatar(size);
    }

    private static extractDuration(duration: number) {
        return {
            seconds: Math.floor((duration / Second) % 60),
            minutes: Math.floor((duration / Minute) % 60),
            hours: Math.floor((duration / Hour) % 24),
            days: Math.floor(duration / Day)
        };
    }

}


export interface ImageOptions {
    user?: KlasaUser;
    size?: ImageSize;
}
