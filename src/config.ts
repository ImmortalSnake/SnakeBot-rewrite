import { KlasaClientOptions } from 'klasa';

export default {
    ownerID: '410806297580011520',
    mentionPrefix: true,
    prefix: '+',
    preserveSettings: false,
    noPrefixDM: true,
    pieceDefaults: {
        commands: {
            quotedStringSupport: true,
            runIn: ['text'],
            usageDelim: ' '
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
        tag: 'Local Lavalink Server',
        host: 'localhost',
        password: 'youshallnotpass',
        port: 2333,
        reconnectInterval: 30 * 1000
    } /*
    {
        name: 'Repl Lavalink Server',
        host: process.env.HOST as string,
        auth: 'youshallnotpass',
        port: '/' as unknown as number
    }
    */
];

export const SnakeBotConfig = {
    WeatherKey: process.env.WEATHER_KEY as string
};
