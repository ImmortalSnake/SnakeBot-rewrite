import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { TextChannel, MessageEmbed } from 'discord.js';

const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite|invite\.gg)\/.+/;
export default class extends Monitor {

    public constructor(store: MonitorStore, file: string[], directory: string) {
        super(store, file, directory, {
            ignoreOthers: false,
            ignoreBots: false,
            ignoreEdits: false
        });
    }

    public async run(msg: KlasaMessage) {
        if (!msg.guild || !msg.deletable) return;

        const enabled = msg.guildSettings.get('automod.invites');
        const staffbypass = msg.guildSettings.get('automod.ignorestaff');

        if (!enabled || !regex.test(msg.content)) return;
        if (staffbypass && await msg.hasAtLeastPermissionLevel(4)) return;

        await msg.delete({ reason: 'No invites allowed' });
        const chanID = msg.guildSettings.get('channels.log') as string;
        const logChannel = msg.guild.channels.cache.get(chanID) as TextChannel;

        if (!logChannel?.postable || !logChannel.embedable) return null;
        return logChannel.send(new MessageEmbed()
            .setColor('RED')
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setTitle('Auto Mod - Invite Deleted')
            .setDescription([
                `**Channel:** ${msg.channel.toString()}`,
                `**Content:**\n${msg.content}`
            ])
            .setTimestamp());
    }

}
