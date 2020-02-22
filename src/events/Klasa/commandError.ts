import { Event, KlasaMessage, Command } from 'klasa';

export default class extends Event {

    public async run(message: KlasaMessage, command: Command, params: string[], error: Error) {
        if (error instanceof Error) this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`);
        if (error.message) {
            return message.sendLocale('COMMAND_ERROR').catch(e => this.client.emit('wtf', e));
        }
        return message.send(error).catch(e => this.client.emit('wtf', e));
    }

}
