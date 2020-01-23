import { Client, KlasaClientOptions } from 'klasa';
import Embed from './utils/RichEmbedHandler';
import permissionLevel from './structures/permissionLevel';
import './structures/schemas/guildSchema';
import MemeHandler from './structures/meme';
import AudioManager from './structures/audio/Manager';

export default class SnakeBot extends Client {

    public id: string;
    public shardCount: number;
    public meme: MemeHandler;
    public audio: AudioManager;
    public version = 'v0.4.2 - Alpha';

    public constructor(options: KlasaClientOptions = {}) {
        super(options);

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
