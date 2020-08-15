import { KlasaClientOptions } from 'klasa';

const production = process.env.NODE_ENV === 'production'
export default {
    ownerID: '410806297580011520',
    mentionPrefix: true,
    prefix: 'sb!',
    regexPrefix: /^(?:hey |ok |hi )?(?:snakey|snakebot)(?: |,|!)/ig,
    prefixCaseInsensitive: true,
    preserveSettings: false,
    noPrefixDM: true,
    commandEditing: true,
    commandMessageLifetime: 120,
    disableEveryone: true,
    clientID: '543796400165748736',
    clientSecret: process.env.CLIENT_SECRET,
    production,
    providers: {
        default: production ? 'mongodb' : 'json'
    },
    presence: {
        activity: {
            name: 'sb!help',
            type: 'LISTENING'
        }
    },
    pieceDefaults: {
        commands: {
            quotedStringSupport: true,
            runIn: ['text'],
            usageDelim: ' '
        }
    },
    disabledEvents: [
        'CHANNEL_PINS_UPDATE',
        'GUILD_MEMBER_UPDATE',
        'PRESENCE_UPDATE',
        'TYPING_START',
        'USER_UPDATE'
    ]
} as KlasaClientOptions;

export const mongoOptions = {
    uri: process.env.DATABASE_URL || '',
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        poolSize: 5,
        connectTimeoutMS: 10000
    }
};

export const LavalinkServer = [
    {
        tag: 'Local Lavalink Server',
        host: process.env.LAVA_HOST!,
        password: process.env.LAVA_PASS!,
        port: 2333,
        reconnectInterval: 30 * 1000 * 10000
    }
];

export const SnakeBotConfig = {
    WebhookID: process.env.WEBHOOK_ID!,
    WebhookToken: process.env.WEBHOOK_TOKEN!,
    WeatherKey: process.env.WEATHER_KEY!,
    FortniteKey: process.env.FORTNITE_KEY!,
    lavalink: false
};
