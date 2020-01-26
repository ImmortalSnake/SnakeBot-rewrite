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


            COMMAND_AKINATOR_NO_GUESS: 'I don\'t have any guesses. Bravo.',
            COMMAND_TICTACTOE_DIFFICULTY: '**Select Difficulty:**\n**[1]** - `Easy`\n**[2]** - `Medium`\n**[3]** - `Impossible`',
            COMMAND_TICTACTOE_INVALID_DIFFICULTY: ':x: Invalid Difficulty Level',

            COMMAND_JOIN_NO_MEMBER: `:x: I am sorry, but Discord did not tell me the information I need, so I do not know what voice channel are you connected to...`,
            COMMAND_JOIN_NO_VOICECHANNEL: `:x: You are not connected in a voice channel.`,
            COMMAND_JOIN_SUCCESS: channel => `:white_check_mark: Successfully joined the voice channel ${channel}`,
            COMMAND_JOIN_VOICE_DIFFERENT: `:x: Sorry, I am already in a different voice channel`,
            COMMAND_JOIN_VOICE_FULL: `:x: I cannot join your voice channel, it's full... kick somebody or make room for me!`,
            COMMAND_JOIN_VOICE_NO_CONNECT: `:x: I do not have enough permissions to connect to your voice channel. I am missing the **CONNECT** permission.`,
            COMMAND_JOIN_VOICE_NO_SPEAK: `:x: I can connect... but not speak. Please turn on this permission so I can play some music.`,
            COMMAND_JOIN_VOICE_SAME: `:x: Hello! I am already in your voice channel`,
            COMMAND_QUEUE_LINE: (position, duration, title, url, requester) => `**[${position}]** │ ${duration} │ [${title}](${url}) │ Requester: **${requester}**`,

            COMMAND_REMINDER_CREATE: duration => `:white_check_mark: A Reminder was created for ${duration}!`,

            /**
             * Errors
             */

            TIME_UP: ':x: **Sorry, time is up!**',
            CHANNEl_MULTIPLE_GAME: ':x: **Only one game may be occuring per channel**'
        };
    }


}
