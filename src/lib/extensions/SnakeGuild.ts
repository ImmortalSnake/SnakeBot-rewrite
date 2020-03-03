import { Structures } from 'discord.js';
import AudioPlayer from '../structures/audio/AudioPlayer';

export class SnakeGuild extends Structures.get('Guild') {

    public readonly audio: AudioPlayer = new AudioPlayer(this);

}

declare module 'discord.js' {
    interface Guild {
        readonly audio: AudioPlayer;
    }
}

Structures.extend('Guild', () => SnakeGuild);
