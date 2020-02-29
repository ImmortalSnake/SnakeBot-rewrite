import { Event, KlasaMessage, Stopwatch } from 'klasa';
import TagCommand from '../../commands/Utility/tag';

export default class TagHandler extends Event {

    public async run(message: KlasaMessage, command: string) {
        const tagCommand = this.client.commands.get('tag') as TagCommand;
        const timer = new Stopwatch();

        try {
            await this.client.inhibitors.run(message, tagCommand);
            try {
                const commandRun = tagCommand.show(message, [command]);
                timer.stop();
                const response = await commandRun as KlasaMessage | KlasaMessage[];
                await this.client.finalizers.run(message, tagCommand, response, timer);
                this.client.emit('commandSuccess', message, tagCommand, ['show', command], response);
            } catch (error) {
                this.client.emit('commandError', message, tagCommand, ['show', command], error);
            }
        } catch (response) {
            this.client.emit('commandInhibited', message, tagCommand, response);
        }
    }

}
