import { Extendable, ExtendableStore } from 'klasa';
import { Guild } from 'discord.js';
import SnakeBot from '../lib/client';

export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, {
            appliesTo: [Guild]
        });

    }

    public get audio(this: Guild) {
        return (this.client as SnakeBot).audio.players.get(this.id);
    }

}
