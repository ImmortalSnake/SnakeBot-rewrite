import { CommandStore, KlasaMessage, RichDisplay } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import fetch from 'node-fetch';
import { SnakeBotConfig } from '../../config';

type platform = 'xbox' | 'psn' | 'pc';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            usage: '<xbox|psn|pc:default> <username:...string>'
        });
    }

    public async run(msg: KlasaMessage, [platform, username]: [platform, string]) {
        const data = await fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${username}`, {
            headers: { 'TRN-Api-Key': SnakeBotConfig.FortniteKey }
        }).then(res => res.json()) as FortniteResultOK;

        if (data.error) throw ':x: Could not find that fortnite user';

        const lifetime = data.lifeTimeStats;
        const display = new RichDisplay(new SnakeEmbed(msg)
            .setTitle(`Fortnite Stats -  ${data.epicUserHandle}`)
            .setURL(`https://fortnitetracker.com/profile/${data.platformName}/${data.epicUserHandle}`)
            .setThumbnail('https://imgur.com/gallery/WxHCX')
            .init());

        display.addPage((template: SnakeEmbed) => template
            .setDescription([
                `**Lifetime Stats**\n`,
                `❯ **Score:** \`${lifetime.find(s => s.key === 'Score')!.value}\``,
                `❯ **Wins:** \`${lifetime.find(s => s.key === 'Wins')!.value}\``,
                `❯ **Win Percentage:** \`${lifetime.find(s => s.key === 'Win%')!.value}\``,
                `❯ **Matches Played:** \`${lifetime.find(s => s.key === 'Matches Played')!.value}\``,
                `❯ **Kills:** \`${lifetime.find(s => s.key === 'Kills')!.value}\``,
                `❯ **KDR:** \`${lifetime.find(s => s.key === 'K/d')!.value}\``,
                `❯ **Top 3s:** \`${lifetime.find(s => s.key === 'Top 3s')!.value}\``,
                `❯ **Top 5s:** \`${lifetime.find(s => s.key === 'Top 5s')!.value}\``,
                `❯ **Top 6s:** \`${lifetime.find(s => s.key === 'Top 6s')!.value}\``,
                `❯ **Top 10s:** \`${lifetime.find(s => s.key === 'Top 10')!.value}\``,
                `❯ **Top 12s:** \`${lifetime.find(s => s.key === 'Top 12s')!.value}\``,
                `❯ **Top 25s:** \`${lifetime.find(s => s.key === 'Top 25s')!.value}\``
            ].join('\n')));

        if (data.stats.p2) this.stats(display, data.stats.p2, 'Solo');
        if (data.stats.p10) this.stats(display, data.stats.p10, 'Duo');
        if (data.stats.p9) this.stats(display, data.stats.p9, 'Squad');

        const res = await msg.send('Loading...');
        await display.run(res);

        return res;
    }

    private stats(display: RichDisplay, data: FortnitePlayerStats, type: string) {
        return display.addPage((template: SnakeEmbed) => template
            .setDescription([
                `**${type} Stats**\n`,
                `❯ **Score:** \`${data.score.displayValue}\``,
                `❯ **Wins:** \`${data.top1.displayValue}\``,
                `❯ **Win Percentage:** \`${data.winRatio.displayValue}%\``,
                `❯ **Matches Played:** \`${data.matches.value}\``,
                `❯ **Kills:** \`${data.kills.displayValue}\``,
                `❯ **KDR:** \`${data.kd.displayValue}\``,
                `❯ **Top 3s:** \`${data.top3.displayValue}\``,
                `❯ **Top 5s:** \`${data.top5.displayValue}\``,
                `❯ **Top 6s:** \`${data.top6.displayValue}\``,
                `❯ **Top 10s:** \`${data.top10.displayValue}\``,
                `❯ **Top 12s:** \`${data.top12.displayValue}\``,
                `❯ **Top 25s:** \`${data.top25.displayValue}\``
            ]));
    }

}

interface FortniteResultOK {
    error?: string;
    accountId: string;
    platformId: number;
    platformName: string;
    platformNameLong: string;
    epicUserHandle: string;
    stats: FortniteStats;
    lifeTimeStats: FortniteLifetimeStats[];
    recentMatches: FortniteMatch[];
}

interface FortniteStats {
    p2: FortnitePlayerStats;
    p10?: FortnitePlayerStats;
    p9?: FortnitePlayerStats;
}

interface FortnitePlayerStats {
    score: FortnitePlayerStatsData;
    top1: FortnitePlayerStatsData;
    top3: FortnitePlayerStatsData;
    top5: FortnitePlayerStatsData;
    top6: FortnitePlayerStatsData;
    top10: FortnitePlayerStatsData;
    top12: FortnitePlayerStatsData;
    top25: FortnitePlayerStatsData;
    kd: FortnitePlayerStatsData;
    winRatio: FortnitePlayerStatsData;
    matches: FortnitePlayerStatsData;
    kills: FortnitePlayerStatsData;
    minutesPlayed: FortnitePlayerStatsData;
    kpm: FortnitePlayerStatsData;
    kpg: FortnitePlayerStatsData;
    avgTimePlayed: FortnitePlayerStatsData;
    scorePerMatch: FortnitePlayerStatsData;
    scorePerMin: FortnitePlayerStatsData;
}

interface FortnitePlayerStatsData {
    label: string;
    field: string;
    category: string;
    value: string;
    percentile: number;
    displayValue: string;
}

interface FortniteLifetimeStats {
    key: string;
    value: string;
}

interface FortniteMatch {
    id: number;
    accountId: string;
    playlist: string;
    kills: number;
    minutesPlayed: number;
    top1: number;
    top5: number;
    top6: number;
    top10: number;
    top12: number;
    top25: number;
    matches: number;
    top3: number;
    dateCollected: string;
    score: number;
    platform: number;
    trnRating: number;
    trnRatingChange: number;
    playlistId: number;
    playersOutlived: number;
}
