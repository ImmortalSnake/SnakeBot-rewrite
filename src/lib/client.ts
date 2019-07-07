import { Client } from 'klasa';
import Embed from './utils/RichEmbedHandler';
import permissionLevel from './structures/permissionLevel';
import './structures/schemas/guildSchema';
import AudioManager from './structures/audio/manager';
import MemeHandler from './structures/meme';

export default class SnakeBot extends Client {
    id: string;
    shardCount: number;
    audio: AudioManager;
    meme: MemeHandler;

    constructor(...args: any) {
        super(...args);

        this.shardCount = 1;
        this.id = '543796400165748736';
        this.permissionLevels = permissionLevel;
        this.audio = new AudioManager(this);
        this.meme = new MemeHandler(this);
    }

    public get embed() {
        return Embed;
    }
}
