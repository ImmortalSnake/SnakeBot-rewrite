import { KlasaClient, KlasaClientOptions } from 'klasa';
import Embed from './utils/RichEmbedHandler';
import permissionLevel from './structures/permissionLevel';
import './structures/schemas/guildSchema';
import MemeHandler from './structures/meme';
import AudioManager from './structures/audio/Manager';
import APIWrapperStore from './structures/base/APIWrapperStore';

export default class SnakeBot extends KlasaClient {

    public id = '543796400165748736';
    public shardCount = 1;
    public version = 'v0.4.2 - Alpha';
    public meme: MemeHandler;
    public audio: AudioManager;
    public apis: APIWrapperStore;

    public constructor(options: KlasaClientOptions = {}) {
        super(options);

        this.permissionLevels = permissionLevel;
        this.meme = new MemeHandler(this);
        this.apis = new APIWrapperStore(this);

        this.registerStore(this.apis);
        this.audio = new AudioManager(this);

    }

    public get embed() {
        return Embed;
    }

}
