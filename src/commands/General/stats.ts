import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import { MessageEmbed, version as discordVersion } from 'discord.js';
import { util, KlasaMessage, Duration, CommandStore } from 'klasa';
import os from 'os';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            requiredPermissions: ['EMBED_LINKS'],
            runIn: ['text', 'dm'],
            guarded: true
        });
    }

    public async run(msg: KlasaMessage) {
        const usage = process.memoryUsage();
        const guilds = this.client.guilds.cache;
        const embed = new MessageEmbed()
            .setAuthor(this.client.user?.tag, this.client.user?.displayAvatarURL())
            .addField('General Stats',
                util.codeBlock('asciidoc', msg.language.get('COMMAND_STATS_GENERAL',
                    this.client.version,
                    guilds.size,
                    this.client.channels.cache.size,
                    guilds.reduce((a, b) => a + b.memberCount, 0),
                    `${(msg.guild?.shardID ?? 0) + 1} / ${this.client.shard?.count || 1}`,
                    Duration.toNow(Date.now() - (process.uptime() * 1000)),
                    Math.round(this.client.ws.ping),
                    this.client.settings?.get('commandUses'))))
            .addField('System Stats',
                util.codeBlock('asciidoc', msg.language.get('COMMAND_STATS_SYSTEM',
                    os.type().replace('_', ' '),
                    os.cpus()[0].model,
                    (usage.heapUsed / 1024 / 1024).toFixed(2),
                    process.version,
                    discordVersion)))
            .setFooter(`Requested By: ${msg.author.tag}`);

        return msg.send(embed);
    }

}
