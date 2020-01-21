import { Minute, Second, Hour, Day } from './constants';
import fetch from 'node-fetch';

export default class Util {

    public number_string(num: number): string {
        switch (num) {
            case 1: return 'one';
            case 2: return 'two';
            case 3: return 'three';
            case 4: return 'four';
            case 5: return 'five';
            case 6: return 'six';
            case 7: return 'seven';
            case 8: return 'eight';
            case 9: return 'nine';
            case 0: return 'zero';
            default: return '';
        }
    }

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
        const seconds = Math.floor((duration / Second) % 60);
        const minutes = Math.floor((duration / Minute) % 60);
        const hours = Math.floor((duration / Hour) % 24);
        const days = Math.floor(duration / Day);

        let mess = '';
        if (days) mess += `**${days}** ${days > 1 ? 'days' : 'day'} `;
        if (hours) mess += `**${hours}** ${hours > 1 ? 'hours' : 'hour'} `;
        if (minutes) mess += `**${minutes}** ${minutes > 1 ? 'minutes' : 'minute'} `;
        if (seconds) mess += `**${seconds}** ${seconds > 1 ? 'seconds' : 'second'} `;

        return mess;
    }

}
