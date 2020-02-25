import { Event, KlasaMessage, Command, util } from 'klasa';
import SnakeBot from '../../lib/client';
import { MessageEmbed } from 'discord.js';

export default class extends Event {

    public async run(message: KlasaMessage, command: Command, params: string[], error: Error) {
        if (error instanceof Error) this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`);
        if (error.message) {
            await (this.client as SnakeBot).webhook.send(new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setTitle('An Error has Occured')
                .addField('Message', message.content.slice(0, 1000))
                .addField('Guild', `**${message.guild?.name || 'DMs'}**`, true)
                .addField('Language', `**${message.language.name}**`, true)
                .setDescription(`
                **Command**: \`${command.name}\`
                **Error**: ${util.codeBlock('js', (error.stack || error.message).slice(0, 2000))}
                `)
                .setFooter(this.client.user!.tag, this.client.user!.displayAvatarURL())
                .setTimestamp());

            return message.sendLocale('COMMAND_ERROR').catch(e => this.client.emit('wtf', e));
        }

        return message.send(error).catch(e => this.client.emit('wtf', e));
    }

}
