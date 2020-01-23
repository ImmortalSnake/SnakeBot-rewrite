import { Minute, Second, Hour, Day } from './constants';
import fetch from 'node-fetch';

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

    public static formatTime(syncTime: string, asyncTime?: string): string {
        return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
    }

    public static async getHaste(evalResult: string, language: string): Promise<string> {
        // eslint-disable-next-line no-undef
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
        if (days) mess += `**${days}** ${days > 1 ? 'days' : 'day'} `;
        if (hours) mess += `**${hours}** ${hours > 1 ? 'hours' : 'hour'} `;
        if (minutes) mess += `**${minutes}** ${minutes > 1 ? 'minutes' : 'minute'} `;
        if (seconds) mess += `**${seconds}** ${seconds > 1 ? 'seconds' : 'second'} `;

        return mess;
    }

    public static formatDuration(duration: number) {
        const { seconds, minutes, hours } = this.extractDuration(duration);

        return `${(hours < 10) ? `0${hours}` : hours}:${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
    }

    public static shuffle(arr: any[]): any[] {
        for (let i = arr.length; i; i--) {
            const j = Math.floor(Math.random() * i);
            [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
        }
        return arr;
    }

    public static stripIndents(string: string) {
        return string.replace(/^(\s+)\gm/, '');
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
