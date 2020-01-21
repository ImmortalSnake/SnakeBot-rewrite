import { Language, LanguageStore } from 'klasa';

export default class extends Language {

    public constructor(store: LanguageStore, file: string[], directory: string) {
        super(store, file, directory);

        this.language = {

            COMMAND_STATS_GENERAL: (version, guilds, channels, users, shard, uptime, ping) => [
                `• Version :: ${version}`,
                `• Guilds :: ${guilds}`,
                `• Channels :: ${channels}`,
                `• Users :: ${users}`,
                `• Shard :: ${shard}`,
                `• Uptime :: ${uptime}`,
                `• Ping :: ${ping} ms`
            ].join('\n'),
            COMMAND_STATS_SYSTEM: (os, cpu, usage, nodeVersion, discordVersion) => [
                `• Operating System :: ${os} `,
                `• Processor :: ${cpu}`,
                `• Memory Usage :: ${usage} MB`,
                `• Node Version :: ${nodeVersion}`,
                `• DiscordJS Version :: ${discordVersion}`
            ].join('\n'),

            COMMAND_QUEUE_LINE: (position, duration, title, url, requester) => `**[${position}]** │ ${duration} │ [${title}](${url}) │ Requester: **${requester}**`,

            COMMAND_REMINDER_CREATE: duration => `:white_check_mark: A Reminder was created for ${duration}!`
        };
    }


}
