import { KlasaClient, KlasaClientOptions } from 'klasa';
import permissionLevel from './structures/permissionLevel';
import MemeHandler from './structures/meme';
import AudioManager from './structures/audio/AudioManager';
import APIWrapperStore from './structures/base/APIWrapperStore';
import { WebhookClient } from 'discord.js';
import { SnakeBotConfig } from '../config';
import { GiveawayClient } from 'klasa-giveaway';
import { DashboardClient } from 'klasa-dashboard-hooks';

import './Setup/Canvas';
import './extensions/SnakeGuild';
import './structures/schemas/GuildSchema';
import './structures/schemas/ClientSchema';
import './structures/schemas/UserSchema';

const { WebhookID, WebhookToken } = SnakeBotConfig;

KlasaClient
    .use(GiveawayClient)
    .use(DashboardClient);

export default class SnakeBot extends KlasaClient {

    public version = 'v0.5.2 - Alpha';
    public meme: MemeHandler;
    public audio: AudioManager;
    public apis: APIWrapperStore;
    public webhook: WebhookClient;

    public constructor(options: KlasaClientOptions = {}) {
        super(options);

        this.permissionLevels = permissionLevel;
        this.meme = new MemeHandler(this);
        this.apis = new APIWrapperStore(this);

        this.registerStore(this.apis);
        this.audio = new AudioManager(this);

        this.webhook = new WebhookClient(WebhookID, WebhookToken, { disableEveryone: true });

    }

}
