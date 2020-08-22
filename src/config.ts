import { KlasaClientOptions } from 'klasa';
import { Giveaway } from 'klasa-giveaway';

const production = process.env.NODE_ENV === 'production';
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
        'default': production ? 'mongodb' : 'json'
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
    ],
    giveaway: {
        maxGiveaways: 10,
        nextRefresh(giveaway: Giveaway): number {
            const timeLeft = giveaway.endsAt - Date.now();
            let nextRefresh = 4 * 3600 * 1000; // 4 hours at more than 1 day

            if (timeLeft < 30) nextRefresh = 5; // 5 seconds at less than 30 seconds
            else if (timeLeft < 180 * 1000) nextRefresh = 20 * 1000; // 20 seconds at less than 3 minute
            else if (timeLeft < 3600 * 1000) nextRefresh = 120 * 1000; // 2 minutes at less than 1 hour
            else if (timeLeft < 24 * 3600 * 1000) nextRefresh = 3600 * 1000; // 1 hour at less than 1 day

            return giveaway.lastRefresh + nextRefresh;
        }
    }
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
        id: '1',
        host: process.env.LAVA_HOST!,
        password: process.env.LAVA_PASS!,
        port: process.env.LAVA_PORT!,
        reconnectInterval: 30 * 1000
    }
];

export const SnakeBotConfig = {
    WebhookID: process.env.WEBHOOK_ID!,
    WebhookToken: process.env.WEBHOOK_TOKEN!,
    WeatherKey: process.env.WEATHER_KEY!,
    FortniteKey: process.env.FORTNITE_KEY!
};
