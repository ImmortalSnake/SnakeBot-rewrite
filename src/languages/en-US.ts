import { Language, LanguageStore } from 'klasa';
import Util from '../lib/utils/Util';

export default class extends Language {

    public constructor(store: LanguageStore, file: string[], directory: string) {
        super(store, file, directory);

        this.language = {

            COMMAND_CONF_GET: (prefix, key, value) => `
            **Current Value**: \`${value}\`
            **Update**: \`${prefix}conf set ${key} <value>\`
            **Reset**: \`${prefix}conf reset ${key}\``,

            COMMAND_HELP_USAGE: usage => `📜 | **Command Usage**\n\`${usage}\``,
            COMMAND_HELP_EXTENDED: `🔎 | **Extended Help**`,

            COMMAND_STATS_GENERAL: (version, guilds, channels, users, shard, uptime, ping, uses) => [
                `• Version      :: ${version}`,
                `• Guilds       :: ${guilds}`,
                `• Channels     :: ${channels}`,
                `• Users        :: ${users}`,
                `• Shard        :: ${shard}`,
                `• Uptime       :: ${uptime}`,
                `• Ping         :: ${ping} ms`,
                `• Command Uses :: ${uses}`
            ].join('\n'),
            COMMAND_STATS_SYSTEM: (os, cpu, usage, nodeVersion, discordVersion) => [
                `• Operating System  :: ${os} `,
                `• Processor         :: ${cpu}`,
                `• Memory Usage      :: ${usage} MB`,
                `• Node Version      :: ${nodeVersion}`,
                `• DiscordJS Version :: ${discordVersion}`
            ].join('\n'),


            COMMAND_AKINATOR_NO_GUESS: 'I don\'t have any guesses. Bravo.',
            GAME_DIFFICULTY: '**Select Difficulty:**\n**[1]** - `Easy`\n**[2]** - `Medium`\n**[3]** - `Impossible`',
            GAME_INVALID_DIFFICULTY: '❌ Invalid Difficulty Level',

            COMMAND_JOIN_NO_MEMBER: `❌ I am sorry, but Discord did not tell me the information I need, so I do not know what voice channel are you connected to...`,
            COMMAND_JOIN_NO_VOICECHANNEL: `❌ You are not connected in a voice channel.`,
            COMMAND_JOIN_SUCCESS: channel => `:white_check_mark: Successfully joined the voice channel ${channel}`,
            COMMAND_JOIN_VOICE_DIFFERENT: `❌ Sorry, I am already in a different voice channel`,
            COMMAND_JOIN_VOICE_FULL: `:x: I cannot join your voice channel, it's full... kick somebody or make room for me!`,
            COMMAND_JOIN_VOICE_NO_CONNECT: `:x: I do not have enough permissions to connect to your voice channel. I am missing the **CONNECT** permission.`,
            COMMAND_JOIN_VOICE_NO_SPEAK: `:x: I can connect... but not speak. Please turn on this permission so I can play some music.`,
            COMMAND_JOIN_VOICE_SAME: `:x: Hello! I am already in your voice channel`,
            COMMAND_QUEUE_LINE: (position, duration, title, url, requester) => `**[${position}]** │ ${duration} │ [${title}](${url}) │ Requester: **${requester}**`,

            COMMAND_REMINDER_CREATE: duration => `:white_check_mark: A Reminder was created for ${duration}!`,
            COMMAND_AFK_CREATE: (user, reason) => `${user} has been set to AFK for reason: **${reason}**`,

            COMMAND_EVAL_SENDHASTE: (time, url, footer) => `Output was too long... sent the result in **hastebin**:\n${url}\n**TYPE**\n${footer}\n${time}`,

            COMMAND_YOUTUBE_NO_SEARCH: 'Could not find any youtube result with that title',
            /**
             * Giveaway command locales
             */

            ENDS_AT: 'Ends At:',
            ENDED_AT: 'Ended At:',
            GIVEAWAY_NOT_FOUND: 'Could not find that giveaway! Try again!',
            MAX_GIVEAWAYS: max => `You can have only upto ${max} giveaways in a guild! Remove a giveaway and try again!`,
            GIVEAWAY_RUNNING: 'This giveaway is running right now. Wait for it to end or use the `end` command to stop it now!',
            NO_RUNNING_GIVEAWAY: prefix => `There are no running giveaways in this server. Create one using the \`${prefix}gcreate\` command!`,
            NO_FINISHED_GIVEAWAY: prefix => `No giveaways were completed in this server. Use \`${prefix}gcreate\` to create one and \`${prefix}gend\` to end it`,

            COMMAND_CREATE_DESCRIPTION: 'Creates a giveaway in the specified channel!',
            COMMAND_CREATE_EXTENDED: `You must specify the channel, duration, amount of winners and title of the giveaway
            The bot then sends a message to the channel and reacts with 🎉, members of your server must react with the same emoji in order to participate.
            Once the timer is up, the bot will pick a few winners and send a message stating the same`,

            COMMAND_DELETE_DESCRIPTION: 'Deletes a giveaway!',
            COMMAND_DELETE_EXTENDED: `Accidently created a giveaway? No problem!
            If you do not provide the message id, it will delete the most recent running giveaway
            Deleting the giveaway message will also work`,

            COMMAND_END_DESCRIPTION: 'Ends a giveaway immediately',
            COMMAND_END_EXTENDED: `Can't wait for the timer to finish? This command ends your giveaway immediately and picks the winners
            If you do not provide a message id, it will end the most recent running giveaway`,

            COMMAND_LIST_DESCRIPTION: 'Lists all running giveaways in the server',
            COMMAND_LIST_EXTENDED: `Quickly see all giveaways and their details running in your server with this command`,

            COMMAND_REROLL_DESCRIPTION: 'Rerolls a previously finished giveaway.',
            COMMAND_REROLL_EXTENDED: `This command choses new winners for a previously finished giveaway
            If you do not provide a message id, it will reroll the most recently finished giveaway`,

            COMMAND_START_DESCRIPTION: 'Immediately starts a giveaway in the current channel',
            COMMAND_START_EXTENDED: `Same as the create command, except you dont need to specify the channel as the current channel will be used`,

            GIVEAWAY_CREATE: ':tada: **GIVEAWAY** :tada:',
            GIVEAWAY_END: ':tada: **GIVEAWAY ENDED** :tada:',
            GIVEAWAY_DELETE: id => `Successfully deleted the giveaway with the id: \`${id}\``,
            GIVEAWAY_WON: (winners, title) => `:tada: Congratulations ${winners}! You won **${title}**`,
            GIVEAWAY_CREATE_SUCCESS: chan => `A giveaway was started in ${chan}!`,
            NOT_ENOUGH_REACTIONS: count =>
                `The Giveaway has ended, not enough people voted.
				**Votes Required:** \`${count}\``,
            GIVEAWAY_DESCRIPTION: (winners, tleft, author) =>
                `**React with :tada: to enter**

				**Winner Count:** \`${winners}\`
				**Time Left:** ${tleft}
				**Hosted By:** <@${author}>`,

            GIVEWAY_LIST_TITLE: name => `Active giveaways on **${name}**`,
            GIVEAWAY_LIST_BODY: (i, message, channel, wCount, time, title) =>
                `\n**${i}]** \`${message}\` → <#${channel}> | \`${wCount}\` **Winner(s)** | **Ends At:** ${Util.msToDuration(time - Date.now())} | **Title:** \`${title}\``,


            COMMAND_EXEC_DESCRIPTION: '',
            COMMAND_EXEC_EXTENDED: '',

            COMMAND_EVAL_EXTENDED: [
                'The eval command evaluates code as-in, any error thrown from it will be handled.',
                'It also uses the flags feature. Write **--silent**, **--depth=number** or **--async** to customize the output.',
                'The **--silent** flag will make it output nothing.',
                'The **--depth** flag accepts a number, for example, **--depth=2**, to customize util.inspect\s depth.',
                'The **--async** flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the **return** keyword.',
                'The **--showHidden** flag will enable the showHidden option in util.inspect.',
                'If the output is too large, it\ll send the output as a file, or in the console if the bot does not have the `ATTACH_FILES` permission.'
            ].join('\n'),
            /**
             * Configuration
             */

            COMMAND_PREFIX_DESCRIPTION: 'View or set the prefix for your server',
            COMMAND_PREFIX_EXTENDED: '',

            /**
             * Fun
             */

            COMMAND_8BALL_DESCRIPTION: 'Ask any question and the holy 8ball shall answer',
            COMMAND_8BALL_EXTENDED: 'Gives you random answers based on your questions',

            COMMAND_AUTOMEME_DESCRIPTION: '',
            COMMAND_AUTOMEME_EXTENDED: '',

            COMMAND_CUBES_DESCRIPTION: 'Cubify your text!',
            COMMAND_CUBES_EXTENDED: [
                'This is a unique fun command that generates cubes from your input.\nHere is an example',
                '```',
                '      S N A K E S',
                '    / N       / N',
                '  /   A     /   A',
                'S N A K E S     K',
                'N     A   N     E',
                'A     S N A K E S',
                'K   /     K   /',
                'E /       E /',
                'S N A K E S',
                '```'
            ].join('\n'),

            COMMAND_FLIPTEXT_DESCRIPTION: 'Flips your text',
            COMMAND_FLIPTEXT_EXTENDED: 'sᴉɥʇ pɐǝɹ noʎ uɐɔ',

            COMMAND_INSULT_DESCRIPTION: 'Insult a user.. Hahaha!',
            COMMAND_INSULT_EXTENDED: 'If no user is provided, it insults you! Try it',

            COMMAND_MEME_DESCRIPTION: 'Memes to keep you healthy',
            COMMAND_MEME_EXTENDED: '**NOTE** All memes displayed are taken from reddit, please do give credit to their creators',

            COMMAND_PUN_DESCRIPTION: '',
            COMMAND_PUN_EXTENDED: '',

            COMMAND_QUOTE_DESCRIPTION: '',
            COMMAND_QUOTE_EXTENDED: '',

            COMMAND_RATE_DESCRIPTION: 'Rate something out of 10',
            COMMAND_RATE_EXTENDED: '',

            COMMAND_SAY_DESCRIPTION: 'Make the bot say something for you!',
            COMMAND_SAY_EXTENDED: '**Note** This command requires me and you to have the \`MANAGE_MESSAGES\` permission',

            COMMAND_SLAP_DESCRIPTION: 'Slap someone',
            COMMAND_SLAP_EXTENDED: '',

            COMMAND_VAPORWAVE_DESCRIPTION: 'Vaporize your text',
            COMMAND_VAPORWAVE_EXTENDED: '',

            COMMAND_YOUTUBE_DESCRIPTION: 'Searches youtube for a channel, comment or video',
            COMMAND_YOUTUBE_EXTENDED: 'Fetches details of a particular youtube channel, command or video',

            COMMAND_ZALGO_DESCRIPTION: 'zalgoify your text',
            COMMAND_ZALGO_EXTENDED: '',
            COMMAND_AKINATOR_DESCRIPTION: '',
            COMMAND_AKINATOR_EXTENDED: '',

            COMMAND_CONNECT4_DESCRIPTION: 'Play a game of connect4 with me or someone else',
            COMMAND_CONNECT4_EXTENDED: [
                `**Connect Four** *(also known as Four Up, Plot Four, Find Four, Four in a Row, Drop Four and Gravitrips)*\
                is a two-player connection game in which the players first choose a color and then take turns dropping one colored disc from the top into a 7x6 grid.`,
                'The pieces fall straight down, occupying the lowest available space within the column.',
                'The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one\s own discs.'
            ].join('\n'),

            COMMAND_RPS_DESCRIPTION: '',
            COMMAND_RPS_EXTENDED: '',
            COMMAND_SLOTS_DESCRIPTION: '',
            COMMAND_SLOTS_EXTENDED: '',

            COMMAND_TICTACTOE_DESCRIPTION: 'Play a game of tic-tac-toe with me or someone else',
            COMMAND_TICTACTOE_EXTENDED: `Tic-tac-toe, noughts and crosses, or Xs and Os is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid.
            The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.`,

            COMMAND_STATS_DESCRIPTION: 'Shows some statistics regarding the bot',
            COMMAND_STATS_EXTENDED: '',

            COMMAND_HITLER_DESCRIPTION: 'Generates a hitler meme',
            COMMAND_HITLER_EXTENDED: '',

            COMMAND_TWEET_DESCRIPTION: 'Generates a tweet image',
            COMMAND_TWEET_EXTENDED: '',

            COMMAND_WANTED_DESCRIPTION: '',
            COMMAND_WANTED_EXTENDED: '',

            COMMAND_YTCOMMENT_DESCRIPTION: '',
            COMMAND_YTCOMMENT_EXTENDED: '',

            COMMAND_BAN_DESCRIPTION: 'Ban a user/member from your guild',
            COMMAND_BAN_EXTENDED: `This command requires me to have the \`BAN_MEMBERS\` permission.
            Only members with a lower role hierarchy than you and me can be banned.`,

            COMMAND_CASE_DESCRIPTION: 'View details of a moderation log case',
            COMMAND_CASE_EXTENDED: `Shows you information of a certain activity that has taken place in your server (ban, kick, mute, ...) using the case id`,

            COMMAND_KICK_DESCRIPTION: 'Kick a member from your guild',
            COMMAND_KICK_EXTENDED: `This command requires me to have the \`KICK_MEMBERS\` permission.
            Only members with a lower role hierarchy than you and me can be kicked.`,

            COMMAND_LOCKDOWN_DESCRIPTION: '',
            COMMAND_LOCKDOWN_EXTENDED: '',

            COMMAND_MODLOG_DESCRIPTION: '',
            COMMAND_MODLOG_EXTENDED: '',

            COMMAND_MUTE_DESCRIPTION: '',
            COMMAND_MUTE_EXTENDED: '',

            COMMAND_PURGE_DESCRIPTION: '',
            COMMAND_PURGE_EXTENDED: '',

            COMMAND_REASON_DESCRIPTION: 'View or edit the reason of a moderation log case',
            COMMAND_REASON_EXTENDED: '',

            COMMAND_REPORT_DESCRIPTION: '',
            COMMAND_REPORT_EXTENDED: '',

            COMMAND_SLOWMODE_DESCRIPTION: '',
            COMMAND_SLOWMODE_EXTENDED: '',

            COMMAND_SOFTBAN_DESCRIPTION: 'Bans a member from your guild and immediately unbans them',
            COMMAND_SOFTBAN_EXTENDED: `This command requires me to have the \`BAN_MEMBERS\` permission.
            Only members with a lower role hierarchy than you and me can be banned.
            Softbans are similar to a kick while also pruning all messages sent by them in the last few days`,

            COMMAND_UNBAN_DESCRIPTION: 'Unbans a user from your guild',
            COMMAND_UNBAN_EXTENDED: `This command requires me to have the \`BAN_MEMBERS\` permission
            Removes the ban that they previously had, allowing them to join your guild`,

            COMMAND_UNMUTE_DESCRIPTION: '',
            COMMAND_UNMUTE_EXTENDED: '',

            COMMAND_WARN_DESCRIPTION: '',
            COMMAND_WARN_EXTENDED: '',

            COMMAND_BASSBOOST_DESCRIPTION: '',
            COMMAND_BASSBOOST_EXTENDED: '',

            COMMAND_JOIN_DESCRIPTION: 'Joins your voice channel',
            COMMAND_JOIN_EXTENDED: '',

            COMMAND_LEAVE_DESCRIPTION: 'Leaves the current voice channel',
            COMMAND_LEAVE_EXTENDED: '',

            COMMAND_LOOP_DESCRIPTION: 'Toggles looping for the queue',
            COMMAND_LOOP_EXTENDED: '',

            COMMAND_LYRICS_DESCRIPTION: 'Check out the lyrics of a song',
            COMMAND_LYRICS_EXTENDED: `Searches lyrics for the specified song or the current playing song using the **Genius** API`,

            COMMAND_NOWPLAYING_DESCRIPTION: '',
            COMMAND_NOWPLAYING_EXTENDED: '',
            COMMAND_PAUSE_DESCRIPTION: '',
            COMMAND_PAUSE_EXTENDED: '',
            COMMAND_PLAY_DESCRIPTION: '',
            COMMAND_PLAY_EXTENDED: '',
            COMMAND_RESUME_DESCRIPTION: '',
            COMMAND_RESUME_EXTENDED: '',

            COMMAND_SEARCH_DESCRIPTION: '',
            COMMAND_SEARCH_EXTENDED: '',

            COMMAND_SEEK_DESCRIPTION: '',
            COMMAND_SEEK_EXTENDED: '',
            COMMAND_SKIP_DESCRIPTION: '',
            COMMAND_SKIP_EXTENDED: '',
            COMMAND_VOLUME_DESCRIPTION: '',
            COMMAND_VOLUME_EXTENDED: '',
            COMMAND_CAT_DESCRIPTION: '',
            COMMAND_CAT_EXTENDED: '',
            COMMAND_DOG_DESCRIPTION: '',
            COMMAND_DOG_EXTENDED: '',

            COMMAND_MOVIE_DESCRIPTION: 'Searches TheMovieDatabase for any movie',
            COMMAND_MOVIE_EXTENDED: `This command retrieves information of a movie from **TheMovieDatabase** API`,

            COMMAND_SHOWS_DESCRIPTION: 'Searches TheMovieDatabase for any show',
            COMMAND_SHOWS_EXTENDED: `This command retrieves information of a tv show from **TheMovieDatabase** API`,

            COMMAND_URBAN_DESCRIPTION: 'Check the definition of some word on UrbanDictionary.',
            COMMAND_URBAN_EXTENDED: 'This command can be used in **nsfw** channels only',

            COMMAND_WEATHER_DESCRIPTION: 'Check the weather details of any city',
            COMMAND_WEATHER_EXTENDED: '',

            COMMAND_WIKIPEDIA_DESCRIPTION: 'Searches wikipedia for your query',
            COMMAND_WIKIPEDIA_EXTENDED: '',

            COMMAND_AFK_DESCRIPTION: '',
            COMMAND_AFK_EXTENDED: '',

            COMMAND_AVATAR_DESCRIPTION: '',
            COMMAND_AVATAR_EXTENDED: '',

            COMMAND_CODE_DESCRIPTION: 'Evaluate code in any language!',
            COMMAND_CODE_EXTENDED: '',

            COMMAND_DISCRIMINATOR_DESCRIPTION: '',
            COMMAND_DISCRIMINATOR_EXTENDED: '',

            COMMAND_DOCS_DESCRIPTION: 'Searches discord.js documentation',
            COMMAND_DOCS_EXTENDED: '',

            COMMAND_EMOTES_DESCRIPTION: '',
            COMMAND_EMOTES_EXTENDED: '',

            COMMAND_POLL_DESCRIPTION: '',
            COMMAND_POLL_EXTENDED: '',

            COMMAND_REMINDER_DESCRIPTION: '',
            COMMAND_REMINDER_EXTENDED: '',

            COMMAND_SERVER_DESCRIPTION: '',
            COMMAND_SERVER_EXTENDED: '',

            COMMAND_TOPINVITES_DESCRIPTION: '',
            COMMAND_TOPINVITES_EXTENDED: '',

            COMMAND_USER_DESCRIPTION: 'Provides information of a specified user',
            COMMAND_USER_EXTENDED: '',

            COMMAND_CLEAR_DESCRIPTION: 'Clears the queue ',
            COMMAND_CLEAR_EXTENDED: '',
            COMMAND_MOVE_DESCRIPTION: '',
            COMMAND_MOVE_EXTENDED: '',

            COMMAND_QUEUE_DESCRIPTION: '',
            COMMAND_QUEUE_EXTENDED: '',

            COMMAND_REMOVE_DESCRIPTION: '',
            COMMAND_REMOVE_EXTENDED: '',

            COMMAND_REMOVEDUPES_DESCRIPTION: 'Removes all duplicate entries from the queue',
            COMMAND_REMOVEDUPES_EXTENDED: '',

            COMMAND_SHUFFLE_DESCRIPTION: 'Shuffle the queue',
            COMMAND_SHUFFLE_EXTENDED: '',

            /**
             * Errors
             */

            COMMAND_ERROR: 'Uh oh! An error has occured... Please try again later!',

            TIME_UP: ':x: **Sorry, time is up!**',
            CHANNEl_MULTIPLE_GAME: ':x: **Only one game may be occuring per channel**',
            CHALLENGE_REJECTED: 'Challenge was rejected',
            MODERATION_SELF: action => `:x: You cannot ${action} yourself!`,
            MODERATION_ME: action => `:x: I cannot ${action} myself.. xD`
        };
    }

}
