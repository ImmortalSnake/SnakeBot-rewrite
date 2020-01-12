import { Command, CommandStore, CommandOptions } from 'klasa';
import SnakeBot from '../../client';

export default class SnakeCommand extends Command {

    public readonly client: SnakeBot;
    public constructor(store: CommandStore, file: string[], directory: string, options: CommandOptions = {}) {
        super(store, file, directory, options);

        this.client = store.client as SnakeBot;
    }

}
