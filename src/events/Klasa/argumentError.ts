import { Event, KlasaMessage, Command } from 'klasa';
import SnakeEmbed from '../../lib/structures/SnakeEmbed';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends Event {

    // eslint-disable-next-line @typescript-eslint/require-await
    public async run(message: KlasaMessage, command: Command, params: string[], error: string) {
        const prefix = message.guildSettings.get('prefix');
        message.send(new SnakeEmbed(message)
            .setColor('RED')
            .setTitle('Invalid Command Usage')
            .setDescription([
                `\`${error}\`\n`,
                `**Usage:** \`${command.usage.fullUsage(message)}\``,
                command instanceof SnakeCommand ? `**Examples:**\n${command.displayExamples(prefix)}` : ''
            ])
            .init()).catch(() => null);
    }

}
