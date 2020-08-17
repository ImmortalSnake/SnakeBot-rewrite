import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { TextChannel, MessageEmbed } from 'discord.js';

const regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/ig;

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

        const enabled = msg.guildSettings.get('automod.links');
        const staffbypass = msg.guildSettings.get('automod.ignorestaff');

        if (!enabled || regex.test(msg.content)) return;
        if (staffbypass && await msg.hasAtLeastPermissionLevel(4)) return;

        await msg.delete({ reason: 'No links allowed' });
        const chanID = msg.guildSettings.get('channels.log') as string;
        const logChannel = msg.guild.channels.cache.get(chanID) as TextChannel;

        if (!logChannel?.postable || !logChannel.embedable) return null;
        return logChannel.send(new MessageEmbed()
            .setColor('RED')
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setTitle('Auto Mod - Link Deleted')
            .setDescription([
                `**Channel:** ${msg.channel.toString()}`,
                `**Content:**\n${msg.content}`
            ])
            .setTimestamp());
    }

}
