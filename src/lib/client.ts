import { KlasaClient, KlasaClientOptions } from 'klasa';
import permissionLevel from './structures/permissionLevel';
import MemeHandler from './structures/meme';
import AudioManager from './structures/audio/AudioManager';
import APIWrapperStore from './structures/base/APIWrapperStore';
import { WebhookClient } from 'discord.js';
import { SnakeBotConfig, LavalinkServer } from '../config';
import { GiveawayClient } from 'klasa-giveaway';
import { DashboardClient } from 'klasa-dashboard-hooks';


// Load all stuctures and extensions
import './Setup/Canvas';
import './extensions/SnakeGuild';
import './structures/schemas/GuildSchema';
import './structures/schemas/ClientSchema';
import './structures/schemas/UserSchema';

const { WebhookID, WebhookToken, lavalink } = SnakeBotConfig;

KlasaClient
    .use(GiveawayClient)
    //.use(DashboardClient);

export default class SnakeBot extends KlasaClient {

    public version = 'v0.5.8 - Alpha';
    public meme: MemeHandler;
    public audio: AudioManager;
    public lavalink: boolean;
    public apis: APIWrapperStore;
    public webhook: WebhookClient;

    public constructor(options: KlasaClientOptions = {}) {
        super(options);

        this.permissionLevels = permissionLevel;
        this.meme = new MemeHandler(this);
        this.apis = new APIWrapperStore(this);

        this.registerStore(this.apis);
        this.lavalink = lavalink;
        this.audio = new AudioManager(this, LavalinkServer, {
            user: '543796400165748736',
            shards: this.options.shardCount
        });

        this.webhook = new WebhookClient(WebhookID, WebhookToken);

    }

}
