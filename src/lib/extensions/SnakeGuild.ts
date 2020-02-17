import { Structures } from 'discord.js';

export class SnakeGuild extends Structures.get('Guild') {


}

declare module 'discord.js' {
    interface Guild {
    }
}

Structures.extend('Guild', () => SnakeGuild);
