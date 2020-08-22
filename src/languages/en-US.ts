import { Language, LanguageStore } from 'klasa';
import Util from '../lib/utils/Util';

export default class extends Language {

    public config: Record<string, string>;
    public constructor(store: LanguageStore, file: string[], directory: string) {
        super(store, file, directory);

        this.language = {

            COMMAND_ERROR: 'Uh oh! An error has occured... Please try again later!',
            NO_SEARCH: 'Could not fetch any search results',

            COMMAND_JOIN_NO_MEMBER: `❌ I am sorry, but Discord did not tell me the information I need, so I do not know what voice channel are you connected to...`,
            COMMAND_JOIN_NO_VOICECHANNEL: `❌ You are not connected in a voice channel.`,
            COMMAND_JOIN_SUCCESS: channel => `✅ Successfully joined the voice channel ${channel}`,
            COMMAND_JOIN_VOICE_DIFFERENT: `❌ Sorry, I am already in a different voice channel`,
            COMMAND_JOIN_VOICE_FULL: `❌ I cannot join your voice channel, it's full... kick somebody or make room for me!`,
            COMMAND_JOIN_VOICE_NO_CONNECT: `❌ I do not have enough permissions to connect to your voice channel. I am missing the **CONNECT** permission.`,
            COMMAND_JOIN_VOICE_NO_SPEAK: `❌ I can connect... but not speak. Please turn on this permission so I can play some music.`,
            COMMAND_JOIN_VOICE_SAME: `❌ Hello! I am already in your voice channel`,

            COMMAND_REMINDER_CREATE: duration => `⏱️ A Reminder was created for ${duration}!`,
            COMMAND_AFK_CREATE: (user, reason) => `${user} has been set to **AFK** for reason: **${reason}**`,
            COMMAND_SUGGESTION_REPLY: '✅ Successfully sent the suggestion. Thank you for taking your time to make this bot better!',

            COMMAND_EVAL_SENDHASTE: (time, url, footer) => `Output was too long... sent the result in **hastebin**:\n${url}\n**TYPE**\n${footer}\n${time}`,

            COMMAND_YOUTUBE_NO_SEARCH: '❌ Could not find any youtube result with that title',

            /**
             * Klasa locales
             */
            COMMAND_INVITE: () => [
                `To add **${this.client.user!.tag}** to your discord guild:`,
                `<${this.client.invite}>`,
                '*The above link is generated requesting the minimum permissions required to use every command currently.*'
            ],

            /**
             * Giveaway command locales
             */

            ENDS_AT: 'Ends At:',
            ENDED_AT: 'Ended At:',
            GIVEAWAY_NOT_FOUND: '❌ Could not find that giveaway! Try again!',
            MAX_GIVEAWAYS: max => `❌ You can have only upto ${max} giveaways in a guild! Remove a giveaway and try again!`,
            GIVEAWAY_RUNNING: '❌ This giveaway is running right now. Wait for it to end or use the `end` command to stop it now!',
            NO_RUNNING_GIVEAWAY: prefix => `❌ There are no running giveaways in this server. Create one using the \`${prefix}gcreate\` command!`,
            NO_FINISHED_GIVEAWAY: prefix => `❌ No giveaways were completed in this server. Use \`${prefix}gcreate\` to create one and \`${prefix}gend\` to end it`,

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

            // Command Specific Locales

            COMMAND_EVAL_EXTENDED: [
                'The eval command evaluates code as-in, any error thrown from it will be handled.',
                'It also uses the flags feature. Write **--silent**, **--depth=number** or **--async** to customize the output.',
                'The **--silent** flag will make it output nothing.',
                'The **--depth** flag accepts a number, for example, **--depth=2**, to customize util.inspect\s depth.',
                'The **--async** flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the **return** keyword.',
                'The **--showHidden** flag will enable the showHidden option in util.inspect.',
                'If the output is too large, it\ll send the output as a file, or in the console if the bot does not have the `ATTACH_FILES` permission.'
            ].join('\n'),

            COMMAND_EXEC_DESCRIPTION: '',
            COMMAND_EXEC_EXTENDED: '',

            COMMAND_CONF_GET: (prefix, path, entry, value) => [
                `${this.config[path.toUpperCase().replace(/(\.|\/)/g, '_')]}`,
                '',
                `✏️ **Current Value**: \`${value}\``,
                `⚙️ **Update**: \`${prefix}conf set ${path} <${entry.type}>\``,
                `🗑️ **Reset**: \`${prefix}conf reset ${path}\``
            ].join('\n'),
            COMMAND_CONF_SHOW: path => `**Guild Settings ${path ? `: ${path}` : ''}**`,
            COMMAND_CONF_SHOW_DESCRIPTION: (prefix, path, display) => `Use \`${prefix}conf ${path ? `${path}/` : ''}<entry>\` to view an entry\n\n${display}`,

            COMMAND_PREFIX_DESCRIPTION: 'View or set the prefix for your server',
            COMMAND_PREFIX_EXTENDED: '',

            COMMAND_8BALL_DESCRIPTION: 'Ask any question and the holy 8ball shall answer',
            COMMAND_8BALL_EXTENDED: 'Gives you random answers based on your questions',
            COMMAND_8BALL_RESPONSES: [
                'It is certain',
                'It is decidedly so',
                'Without a doubt',
                'Yes definitely',
                'You may rely on it',
                'As I see it, yes',
                'Most likely',
                'Outlook good',
                'Yes',
                'Signs point to yes',
                'Reply hazy try again',
                'Ask again later',
                'Better not tell you now',
                'Cannot predict now',
                'Concentrate and ask again',
                'Do not count on it',
                'My reply is no',
                'My sources say no',
                'Outlook not so good',
                'Very doubtful'
            ],

            COMMAND_AUTOMEME_DESCRIPTION: 'Sends memes every **X minutes!**',
            COMMAND_AUTOMEME_EXTENDED: '',
            COMMAND_AUTOMEME_DISABLED: 'Disabled Automemes for the server!',
            COMMAND_AUTOMEME_ENABLED: (channel, minutes) => `✅ Automemes have been set at ${channel} for every **${minutes}** minutes`,

            COMMAND_COWSAY_DESCRIPTION: 'Make a cow say mooo!',
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

            COMMAND_PUN_DESCRIPTION: 'Shows a random pun!',
            COMMAND_PUN_EXTENDED: '',

            COMMAND_QUOTE_DESCRIPTION: 'Quote a message',
            COMMAND_QUOTE_EXTENDED: '',
            COMMAND_RATE_DESCRIPTION: 'Rate something out of 10',
            COMMAND_RATE_REPLY: (item, rate) => `I would give **${item}** a \`${rate} / 10\``,
            COMMAND_SAY_DESCRIPTION: 'Make the bot say something for you!',
            COMMAND_SAY_EXTENDED: '**Note** This command requires me and you to have the \`MANAGE_MESSAGES\` permission',
            COMMAND_SLAP_DESCRIPTION: 'Slap someone',
            COMMAND_SLAP_TITLE: (user1, user2) => `_**${user1}** slaps **${user2}**._`,
            COMMAND_VAPORWAVE_DESCRIPTION: 'Vaporize your text',
            COMMAND_VAPORWAVE_EXTENDED: 'ｈｏｗ ｉｓ ｔｈｉｓ ｌｏｏｋｉｎｇ',
            COMMAND_ZALGO_DESCRIPTION: 'zalgoify your text',
            COMMAND_ZALGO_EXTENDED: '',


            GAME_DIFFICULTY: '**Select Difficulty:**\n**[1]** - `Easy`\n**[2]** - `Medium`\n**[3]** - `Impossible`',
            GAME_INVALID_DIFFICULTY: '❌ Invalid Difficulty Level',
            TIME_UP: ':x: **Sorry, time is up!**',
            CHANNEl_MULTIPLE_GAME: ':x: **Only one game may be occuring per channel**',
            CHALLENGE_REJECTED: 'The challenge was rejected',
            CHALLENGE_TIMEOUT: 'Challenge Request Timeout!',
            NO_SELF_PLAY: 'You cant play against yourself!',


            COMMAND_AKINATOR_NO_GUESS: 'I don\'t have any guesses. Bravo.',
            COMMAND_CONNECT4_DESCRIPTION: 'Play a game of connect4 with me or someone else',
            COMMAND_CONNECT4_EXTENDED: [
                `**Connect Four** *(also known as Four Up, Plot Four, Find Four, Four in a Row, Drop Four and Gravitrips)*\
                is a two-player connection game in which the players first choose a color and then take turns dropping one colored disc from the top into a 7x6 grid.`,
                'The pieces fall straight down, occupying the lowest available space within the column.',
                'The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one\s own discs.'
            ].join('\n'),

            COMMAND_RPS_DESCRIPTION: 'Play Rock Paper Scissors!',
            COMMAND_RPS_EXTENDED: '',
            COMMAND_SLOTS_DESCRIPTION: 'Play slots... See if you are lucky!',
            COMMAND_SLOTS_EXTENDED: 'You win when all 3 emotes are the same. Good Luck!',

            COMMAND_TICTACTOE_DESCRIPTION: 'Play a game of tic-tac-toe with me or someone else',
            COMMAND_TICTACTOE_EXTENDED: `Tic-tac-toe, noughts and crosses, or Xs and Os is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid.
            The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.`,

            COMMAND_HELP_USAGE: usage => `📜 | **Command Usage**\n\`${usage}\``,
            COMMAND_HELP_EXTENDEDHELP: `🔎 | **Extended Help**`,
            COMMAND_STATS_DESCRIPTION: 'Shows some statistics related to the bot',
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
            COMMAND_SUGGEST_DESCRIPTION: `Want to see a new command or a new feature added? Give your suggestions!`,

            COMMAND_HITLER_DESCRIPTION: 'Generates a hitler meme',
            COMMAND_MOCK_DESCRIPTION: 'Generates a spongebob mocking meme',
            COMMAND_TWEET_DESCRIPTION: 'Generates a tweet image',
            COMMAND_WANTED_DESCRIPTION: 'Generates a wanted image',
            COMMAND_YTCOMMENT_DESCRIPTION: 'Generates a youtube comment image',

            MODERATION_SELF: action => `:x: You cannot ${action} yourself!`,
            MODERATION_ME: action => `:x: I cannot ${action} myself.. xD`,
            MODERATION_NO_ACTION_USER: action => `:x: You cannot ${action} this user! Your role hierarchy must be higher in order to ${action}`,
            MODERATION_NO_ACTION_ME: action => `:x: I cannot ban this user! My role hierarchy must be higher in order to ${action}`,
            MODERATION_USER_DM: (action, guild, reason) => `You were ${action} from **${guild}** for reason:\n**${reason}**`,

            COMMAND_BAN_DESCRIPTION: 'Ban a user/member from your guild',
            COMMAND_BAN_EXTENDED: `This command requires me to have the \`BAN_MEMBERS\` permission.
            Only members with a lower role hierarchy than you and me can be banned.`,
            COMMAND_BAN_INVALID_TEMP: 'Invalid ban duration, minimum is 0s and maximum is 30 days',
            COMMAND_BAN_INVALID_SOFT: 'Invalid days of messages to be deleted. 1-7 only',

            COMMAND_CASE_DESCRIPTION: 'View details of a moderation log case',
            COMMAND_CASE_EXTENDED: `Shows you information of a certain activity that has taken place in your server (ban, kick, mute, ...) using the case id`,
            COMMAND_CASE_INVALID: id => `Could not find a case with ID \`${id}\``,

            COMMAND_KICK_DESCRIPTION: 'Kick a member from your guild',
            COMMAND_KICK_EXTENDED: `This command requires me to have the \`KICK_MEMBERS\` permission.
            Only members with a lower role hierarchy than you and me can be kicked.`,

            COMMAND_LOCKDOWN_DESCRIPTION: 'Locks or unlocks a text channel',
            COMMAND_LOCKDOWN_EXTENDED: '',
            COMMAND_LOCKDOWN_NO_PERMS: 'I do not have the permissions to lock this channel',
            COMMAND_LOCKDOWN_INVALID_DURATION: 'Duration should be less than 24 hours',
            COMMAND_LOCKDOWN_LOCK: (duration, user) => `🔒 This channel has been locked ${duration ? `for ${Util.msToDuration(duration)} ` : ''}by ${user}`,
            COMMAND_LOCKDOWN_UNLOCK: channel => `🔓 Lockdown for ${channel} has been lifted`,
            COMMAND_LOCKDOWN_SUCCESS: channel => `${channel} has been locked`,

            COMMAND_MODLOG_DESCRIPTION: 'View all moderation logs for this server or a user',
            COMMAND_MODLOG_EXTENDED: '',

            COMMAND_MUTE_DESCRIPTION: 'Mutes a guild member',
            COMMAND_MUTE_EXTENDED: '',
            COMMAND_MUTE_NO_ROLE: prefix => `A mute role was not found for this guild. Use \`${prefix}conf set roles/mute @muterole\` to set a mute role`,
            COMMAND_MUTE_INVALID_DURATION: 'Invalid mute duration: minimum is 1 minute and max is 30 days',

            COMMAND_PURGE_DESCRIPTION: 'Deletes **x** amount of messages in the current channel',
            COMMAND_PURGE_EXTENDED: '',
            COMMAND_PURGE_NO_MESSAGES: ':x: Could not find any messages to delete! This could be because the messages are over 14 days old',
            COMMAND_PURGE_SUCCESS: size => `**:wastebasket: Deleted ${size} messages!**`,

            COMMAND_REASON_DESCRIPTION: 'View or edit the reason of a moderation log case',
            COMMAND_REASON_EXTENDED: '',

            COMMAND_REPORT_DESCRIPTION: 'Sends a report to someone',
            COMMAND_REPORT_EXTENDED: '',
            COMMAND_REPORT_NO_CHANNEL: prefix => `Could not find a reports channel for this server. Use \`${prefix}conf set channels/report #reportchannel\` to set one up`,

            COMMAND_SLOWMODE_DESCRIPTION: 'Sets a slowmode for the channel',
            COMMAND_SLOWMODE_EXTENDED: '',
            COMMAND_SLOWMODE_MAX_TIME: ':x: Cannot set the cooldown to more than **6 hours**!',
            COMMAND_SLOWMODE_OFF: 'Slowmode for this channel has been turned **off**',
            COMMAND_SLOWMODE_SET: cooldown => `Slowmode for ${cooldown} has been set for this channel`,

            COMMAND_SOFTBAN_DESCRIPTION: 'Bans a member from your guild and immediately unbans them',
            COMMAND_SOFTBAN_EXTENDED: `This command requires me to have the \`BAN_MEMBERS\` permission.
            Only members with a lower role hierarchy than you and me can be banned.
            Softbans are similar to a kick while also pruning all messages sent by them in the last few days`,

            COMMAND_UNBAN_DESCRIPTION: 'Unbans a user from your guild',
            COMMAND_UNBAN_EXTENDED: `This command requires me to have the \`BAN_MEMBERS\` permission
            Removes the ban that they previously had, allowing them to join your guild`,

            COMMAND_UNMUTE_DESCRIPTION: '',
            COMMAND_UNMUTE_EXTENDED: '',
            COMMAND_UNMUTE_NOT_MUTED: ':x: Sorry, but this member is not muted',
            COMMAND_UNMUTE_SUCCESS: (member, reason) => `✅ Successfully unmuted ${member}${reason ? ` for reason **${reason}**` : '!'}`,

            COMMAND_WARN_DESCRIPTION: '',
            COMMAND_WARN_EXTENDED: '',
            COMMAND_WARN_DM: (guild, reason) => `You were warned in **${guild}** for reason: \`${reason}\``,
            COMMAND_WARN_SUCCESS: (member, reason) => `✅ ${member} was warned for reason: **${reason}**`,

            COMMAND_CLEAR_DESCRIPTION: 'Clears the guild queue',
            COMMAND_CLEAR_EXTENDED: 'Removes all tracks from the queue, loaded in the queue. The current track will not be removed',
            COMMAND_CLEAR_SUCCESS: `✅ **Succesfully cleared the queue**`,
            COMMAND_MOVE_DESCRIPTION: 'Move tracks from one position to another!',
            COMMAND_MOVE_EXTENDED: 'Moves a selected track to another position using its current position numbers',
            COMMAND_MOVE_SUCCESS: (from, to) => `✅ **Moved the track from \`${from}\` to \`${to}\``,
            COMMAND_QUEUE_DESCRIPTION: 'Display the guild queue in a neat embed',
            COMMAND_QUEUE_EXTENDED: 'Shows a paginated embed of all tracks loaded in the queue along with their details',
            COMMAND_QUEUE_LINE: (position, duration, title, url, requester) => `**[${position}]** │ ${duration} │ [${title}](${url}) │ Requester: **${requester}**`,
            COMMAND_REMOVE_DESCRIPTION: 'Removes a track from the queue',
            COMMAND_REMOVE_SUCCESS: title => `✅ **Removed** \`${title}\``,
            COMMAND_REMOVEDUPES_DESCRIPTION: 'Removes all duplicate entries from the queue',
            COMMAND_REMOVEDUPES_SUCCESS: diff => `✅ **Removed \`${diff}\` duplicate tracks from the queue**`,
            COMMAND_SHUFFLE_DESCRIPTION: 'Shuffles the queue',
            COMMAND_SHUFFLE_EXTENDED: 'Rearranges the queue so that it is in a random order',
            COMMAND_SHUFFLE_SUCCESS: `🔀 **Shuffled the queue!**`,
            COMMAND_BASSBOOST_DESCRIPTION: '',
            COMMAND_BASSBOOST_EXTENDED: '',
            COMMAND_BASSBOOST_SUCCESS: toggle => `✅ **Bass Boost has been turned \`${toggle ? 'on' : 'off'}\`**`,
            COMMAND_JOIN_DESCRIPTION: 'Joins your voice channel',
            COMMAND_LEAVE_DESCRIPTION: 'Leaves the current voice channel',
            COMMAND_LEAVE_SUCCESS: `✅ **Left the voice channel**`,
            COMMAND_LOOP_DESCRIPTION: 'Toggles looping for the queue',
            COMMAND_LOOP_EXTENDED: '',
            COMMAND_LOOP_SUCCESS: toggle => `**Queue loop has been turned \`${toggle ? 'on' : 'off'}\`**`,
            COMMAND_LYRICS_DESCRIPTION: 'Check out the lyrics of a song',
            COMMAND_LYRICS_EXTENDED: `Searches lyrics for the specified song using the **Genius** API`,
            COMMAND_NOWPLAYING_DESCRIPTION: 'View information about the current track',
            COMMAND_PAUSE_DESCRIPTION: 'Pauses the current track',
            COMMAND_PAUSE_SUCCESS: `⏸️ **Paused current playing music**`,
            COMMAND_PLAY_DESCRIPTION: 'Plays a song with the given name or url',
            COMMAND_PLAY_EXTENDED: [
                'If a url is not provided, the name will be searched in youtube and loaded.',
                'You can also search in soundcloud using `--sc` flag',
                'Playlists are also supported'
            ].join('\n'),
            COMMAND_RESUME_DESCRIPTION: 'Resumes the current track when paused',
            COMMAND_RESUME_SUCCESS: `🎵 **Resumed current playing music**`,
            COMMAND_SEARCH_DESCRIPTION: 'Searches for a list of songs to load',
            COMMAND_SEARCH_EXTENDED: [
                'Searches youtube for a given name and displays it, from which you can select any track to load',
                'You can also search in soundcloud using the `--sc` flag'
            ].join('\n'),
            COMMAND_SEEK_DESCRIPTION: 'Seeks to the specified position in the current track',
            COMMAND_SEEK_EXTENDED: '',
            COMMAND_SEEK_SUCCESS: position => `⏩ Successfully changed the time to \`${position}\`!`,
            COMMAND_SKIP_DESCRIPTION: 'Skips the current track',
            COMMAND_SKIP_EXTENDED: 'Skipping is done on a voting system based on the number of members in the voice channel. DJ Members can force skip',
            COMMAND_SKIP_SUCCESS: `✅ Your skip has been Acknowledged. **Skipping Now** ⏭️`,
            COMMAND_SKIP_ACKNOWLEDGED: req => `✅ Your skip has been Acknowledged. You need **${req}** more votes to skip!`,
            COMMAND_SKIP_DOUBLE: `❌ You already voted to skip!`,
            COMMAND_VOLUME_DESCRIPTION: 'View or set the volume for the guild',
            COMMAND_VOLUME_VIEW: volume => `🔊 The volume for this guild is **${volume}**`,
            COMMAND_VOLUME_SET: volume => `🔊 Set the volume to **${volume}**`,

            COMMAND_CAT_DESCRIPTION: 'Shows a random cat image',
            COMMAND_DOG_DESCRIPTION: 'Shows a random dog image',
            COMMAND_MOVIE_DESCRIPTION: 'Searches TheMovieDatabase for any movie',
            COMMAND_MOVIE_EXTENDED: `This command retrieves information of a movie from **TheMovieDatabase** API`,
            COMMAND_SHOWS_DESCRIPTION: 'Searches TheMovieDatabase for any show',
            COMMAND_SHOWS_EXTENDED: `This command retrieves information of a tv show from **TheMovieDatabase** API`,
            COMMAND_URBAN_DESCRIPTION: 'Check the definition of some word on UrbanDictionary.',
            COMMAND_URBAN_EXTENDED: 'This command can be used in **nsfw** channels only',
            COMMAND_WEATHER_DESCRIPTION: 'Check the weather details of any city',
            COMMAND_WEATHER_EXTENDED: 'This command retrieves weather information using **Open Weather Map** API',
            COMMAND_WIKIPEDIA_DESCRIPTION: 'Searches wikipedia for your query',
            COMMAND_WIKIPEDIA_EXTENDED: 'This command can be used in **nsfw** channels only',
            COMMAND_WIKIPEDIA_NO_SEARCH: 'Could not find this page in wikipedia. Try a lower page',
            COMMAND_YOUTUBE_DESCRIPTION: 'Searches youtube for a channel, comment or video',
            COMMAND_YOUTUBE_EXTENDED: 'Fetches details of a particular youtube channel, command or video',

            COMMAND_ANNOUNCE_SUCCESS: 'Announcement was successfully sent!',
            COMMAND_SELFROLE_DESCRIPTION: 'Choose which roles you like and add them!',

            COMMAND_AFK_DESCRIPTION: 'Set your status as AFK so I will alert anyone who mentions you!',
            COMMAND_AFK_EXTENDED: '',

            COMMAND_AVATAR_DESCRIPTION: 'Shows the avatar of any discord user',

            COMMAND_CODE_DESCRIPTION: 'Evaluate code in any language!',
            COMMAND_CODE_EXTENDED: '',
            COMMAND_CODE_NO_BLOCKS: 'Please enter the code using codeblocks',
            COMMAND_CODE_LANGUAGE_NO_SUPPORT: lang => `Sorry! this language (${lang}) is not supported!`,

            COMMAND_DOCS_DESCRIPTION: 'Searches discord.js documentation',
            COMMAND_DOCS_EXTENDED: '',
            COMMAND_EMOTES_DESCRIPTION: 'View all emotes available on this server',
            COMMAND_POLL_DESCRIPTION: '',
            COMMAND_POLL_EXTENDED: '',

            COMMAND_REMINDER_DESCRIPTION: 'Set a reminder for X minutes',
            COMMAND_REMINDER_EXTENDED: '',

            COMMAND_SERVER_DESCRIPTION: 'View some details of this server',

            COMMAND_TAG_DESCRIPTION: 'Allows you to create, remove or show tags.',
            COMMAND_TAG_EXTENDED: '',
            COMMAND_TAG_ADD_NO_PERMS: 'Sorry, you dont have the permission to add tags',

            COMMAND_TOPINVITES_DESCRIPTION: 'See the guilds top inviters',
            COMMAND_TOPINVITES_EXTENDED: '',
            COMMAND_USER_DESCRIPTION: 'Provides information of a specified user',

            MONITOR_AFK_REMOVE: user => `Welcome back ${user}! I have removed your AFK status`,
            MONITOR_AFK_USER: (user, since, reason) => `**${user}** is currently AFK for reason: \`${reason}\`, ${since} ago`,

            RESOLVER_INVALID_SONG: ':x: Please specify a song name or provide a valid url',
            RESOLVER_MAX_ENTRIES: ':x: You have already reached the maximum number of entries per user',
            RESOLVER_SEARCH_FAILED: ':x: Could not get any search results!'
        };

        this.config = {
            PREFIX: 'Changes the prefix used for all commands in this guild',
            LANGUAGE: 'Changes the language for my responses, currently only english is supported',
            DISABLEDCOMMANDS: 'Allows you to disable any command for this server, however core commands like config and help cannot disabled',
            DISABLENATURALPREFIX: 'Toggle command responses to my natural prefix `snakey, `',
            MUSIC_ALLOWSTREAMS: 'Toggle whether streams can be loaded to the queue',
            MUSIC_VOLUME: 'Set the default volume when I start playing music',
            MUSIC_MAXENTRIES: 'Limit the number of tracks your members can add to queue at a time',
            MUSIC_MAXDURATION: 'Set the maximum duration for tracks, those which are longer will not be loaded',
            MUSIC_ANNOUNCESONGS: 'Toggle whether songs should be announced when they start to play',
            MUSIC_PREVENTDUPLICATES: 'Toggle whether duplicate tracks should be loaded or not',
            STARBOARD_CHANNEL: 'Set the channel where all starred messages will be posted',
            STARBOARD_REQUIRED: 'Set the minimum number of stars required to be on the starboard',
            STARBOARD_EMOJI: 'Change the emoji used for the starboard',
            ROLES_ANNOUNCE: 'The role to be mentioned when an announcement messages is sent using the `announce` command',
            ROLES_DJ: 'A list of roles that can enjoy some special music commands like `bassboost`, `removedupes`',
            ROLES_MUTE: 'Set the mute role that will be used whenever the mute command is used',
            ROLES_AUTO: 'A list of roles that will be given to new members when they join the server',
            ROLES_SELFROLES: 'A list of roles that any member can add using the `selfroles` command',
            CHANNELS_ANNOUNCE: 'Set the channel where announcement messages using the `announce` command will be sent!',
            CHANNELS_LOG: 'Set the channel where all server events such as deleted messages will be posted',
            CHANNELS_MODLOG: 'Set the channel for logging all moderation events such as bans, mutes',
            CHANNELS_WELCOME: 'Set the channel for welcoming new members when they join the server',
            CHANNELS_LEAVE: 'Set the channel for sending farewell messages to members who have left the server',
            CHANNELS_REPORTS: 'Set the channel where reports from the report command will be posted',
            MESSAGE_LEAVE: 'Set the message sent when a member leaves the server',
            MESSAGE_WELCOME: 'Set the welcome message sent when a member joins the server',
            AUTOMOD_LINKS: 'Toggle whether links should be automatically deleted',
            AUTOMOD_INVITES: 'Toggle whether discord server invites should be automatically deleted',
            AUTOMOD_IGNORESTAFF: 'Toggle whether members that have the `MANAGE_MESSAGES` permission to be ignored by the auto moderation'
        };
    }

}
