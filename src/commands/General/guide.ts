import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';

const GUIDES = [
    {
        title: "Welcome New Members",
        name: "welcome",
        description: (prefix: string) => [
            "**Snakebot allows you to easily create welcome/leave messages\n**",
            `**1.** To create a simple welcome system, you must first create a channel and use \`${prefix}conf set channels/welcome #channel\`\n`,
            `**2.** To customise the welcome message, use \`${prefix}conf set message/welcome <message>\`\n`,
            "**3.** For additional information in the message, you can use the following variables:",
            "**To mention the member →** `{member}` or `{user}` or `{mention}`",
            "**To display guild name →** `{guild}` or `{server}`",
            "**To display the guild id →** `{guildid}` or `{serverid}`",
            "**To display the members name →** `{membername}` or `{username}`",
            "**To display the members tag →** `{membertag}` or `{usertag}`",
            "**To display the members id →** `{userid}` or `{id}`",
            "**To display the member count →** `{members}` or `{count}` or `{size}`\n",
            "**4.** Similarly you can also set the leave messages for your server\n",
            `**5.** You can also give roles to new members using \`${prefix}conf set roles/auto @role\``
        ]
    },
    {
        title: "Self Roles",
        name: "selfrole",
        description: (prefix: string) => [
            "**You can let your members give themselves roles that they like using Self Roles",
            "This way, your members can select roles without having the proper permissions!**\n",
            `**1.** To set up selfroles, use \`${prefix}conf set roles/selfroles @role\`\n`,
            `**2.** Now you can use \`${prefix}selfroles\` command to see all the roles your members can choose\n`,
            `**3.** To add a role to yourself use \`${prefix}selfroles add <rolename>\`\n`,
            `**4.** To remove a role, use \`${prefix}selfroles remove <rolename>\`\n`,
            `To remove all self roles do \`${prefix}conf reset roles/selfroles\``
        ]
    },
    {
        title: "Starboard",
        name: "starboard",
        description: (prefix: string) => [
            "**Saves memorable posts to a starboard channel**\n",
            `**1.** To set up the starboard feature, use \`${prefix}conf set starboard/channel #starboard-channel\`\n`,
            `**2.** By default you need at least **3 ⭐ reactions** on a message for it to be on the starboard\n`,
            `To change this, use \`${prefix}conf set starboard/required <number>\` and \`${prefix}conf set starboard/emoji <emoji>\`\n`
        ]
    },
    {
        title: "Giveaways",
        name: "giveaways",
        description: (prefix: string) => [
            "**Start hosting giveaways on your server!**\n",
            `**1.** To interactively setup a giveaway use \`${prefix}gcreate\`\n`,
            "**2.** By default the bot reacts with :tada:, members of your server must react with the same emoji to participate\n",
            "**3.** Once the giveaway duration is up, the bot will pick the winners\n",
            `**4.** You can use \`gstart\`, \`gend\`, \`greroll\`and \`gdelete\` to manage all giveaways in your server`
        ]
    },
    {
        title: "Auto Memes",
        name: "automeme",
        description: (prefix: string) => [
            "**Sends memes to your server every X minutes!**\n",
            `**1.** To setup automemes, go to the channel where you would like automemes and type \`${prefix}automeme <minutes>\`\n`,
            `**2.** To disable this feature use \`${prefix}automeme\` again!`
        ]
    },
    {
        title: "Logging",
        name: "logging",
        description: (prefix: string) => [
            "**Know whats happening in your server with server logs and moderation logs**\n",
            `**1.** To setup server logs, use \`${prefix}conf set channels/log #log-channel\`\n`,
            `**2.** You should now see logs for deleted and edited messages\n`,
            `**3.** To setup moderation logs, use \`${prefix}conf set channels/modlog #modlogs\`\n`,
            `**4.** Any time a moderation command is used, you will recieve the logs`,
            `**5.** You can also setup a reports channel for your members using \`${prefix}conf set channels/reports #reports-channel\``
        ]
    },
    {
        title: "Auto Moderation",
        name: "automod",
        description: (prefix: string) => [
            "**Allow Snakebot to monitor guild messages and moderate automatically**\n",
            `**1.** To automatically delete links, use \`${prefix}conf set automod/links true\`\n`,
            `**2.** To automatically delete invites, use \`${prefix}conf set automod/invites true\`\n`,
            `**3.** You may also want to ignore messages sent my moderators, use \`${prefix}conf set automod/ignorestaff true\``
        ]
    }
]


export default class extends SnakeCommand {

    public constructor(store: CommandStore, files: string[], directory: string) {
        super(store, files, directory, {
            guarded: true,
            aliases: ['guides'],
            runIn: ['text', 'dm'],
            usage: '[guide:...string]',
            requiredPermissions: ['EMBED_LINKS']
        });
    }

    public async run(msg: KlasaMessage, [name]: [string]): Promise<KlasaMessage> {
        const prefix = msg.guildSettings.get('prefix')
        if (name) {
            name = name.toLowerCase();
            const guide = GUIDES.find(g => g.name === name)
            if (!guide) throw `:x: That guide does not exist. Use \`${prefix}guides\` to see all available guides`

            return msg.send(new SnakeEmbed(msg)
                .setTitle(guide.title)
                .setDescription(guide.description(prefix))
                .init()
            )
        }

        const mess = GUIDES.map(g => `**${g.title}** - \`${prefix}guide ${g.name}\``).join('\n')
        return msg.send(new SnakeEmbed(msg)
            .setDescription(`**Here are a list of guides available:**\n\n${mess}`)
            .init()
        )
    }

}
