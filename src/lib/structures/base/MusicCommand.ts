import { CommandStore } from 'klasa';
import SnakeCommand, { SnakeCommandOptions } from './SnakeCommand';

export type MusicFlags = 'USER_VC' | 'SNAKE_VC' | 'SAME_VC' | 'QUEUE_NOT_EMPTY' | 'VOICE_PLAYING' | 'DJ_REQUIRED';
export interface MusicCommandOptions extends SnakeCommandOptions {
    music?: MusicFlags[];
}

export default class extends SnakeCommand {

    public music: MusicFlags[];
    public constructor(store: CommandStore, file: string[], directory: string, options: MusicCommandOptions = {}) {
        super(store, file, directory, options);

        this.music = options.music ?? [];
        if (this.music.includes('SAME_VC')) this.music.push('SNAKE_VC', 'USER_VC');
    }

}
