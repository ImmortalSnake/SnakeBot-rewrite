import { CommandStore, KlasaMessage } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, files: string[], directory: string) {
        super(store, files, directory, {
            guarded: true,
            description: language => language.get('COMMAND_INVITE_DESCRIPTION')
        });
    }

    public async run(message: KlasaMessage): Promise<KlasaMessage> {
        return message.sendLocale('COMMAND_INVITE');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async init(): Promise<void> {
        if (this.client.application && !this.client.application.botPublic) this.permissionLevel = 10;
    }

}
