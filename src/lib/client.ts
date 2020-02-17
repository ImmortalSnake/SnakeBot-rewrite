import { KlasaClient, KlasaClientOptions } from 'klasa';
import Embed from './utils/RichEmbedHandler';
import permissionLevel from './structures/permissionLevel';
import MemeHandler from './structures/meme';
import AudioManager from './structures/audio/Manager';
import APIWrapperStore from './structures/base/APIWrapperStore';

import './extensions/SnakeGuild';
import './structures/schemas/GuildSchema';
import './structures/schemas/ClientSchema';

export default class SnakeBot extends KlasaClient {

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
