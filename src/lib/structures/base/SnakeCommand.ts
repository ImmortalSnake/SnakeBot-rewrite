import { Command, CommandStore, CommandOptions } from 'klasa';
import SnakeBot from '../../client';

export interface SnakeCommandOptions extends CommandOptions {
    examples?: Array<string>;
}

export default class SnakeCommand extends Command {

    public readonly client: SnakeBot;
    public examples: string[];
    public constructor(store: CommandStore, file: string[], directory: string, options: SnakeCommandOptions = {}) {
        super(store, file, directory, options);

        this.client = store.client as SnakeBot;
        this.examples = options?.examples ?? [''];
    }

    public displayExamples(prefix: string) {
        return this.examples.map(example => `\`${prefix}${this.name} ${example}\``).join('\n');
    }

}
