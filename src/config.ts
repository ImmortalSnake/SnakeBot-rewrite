export default {
    ownerID: '410806297580011520',
    prefix: 's!',
    preserveSettings: false,
    noPrefixDM: true,
    disabledCorePieces: ['providers'],
    providers: {
    default: 'mongodb'
    },
    pieceDefaults: {
    commands: {
      quotedStringSupport: true,
      runIn: ['text'],
      usageDelim: ' '
    }
  }
};

export let mongoOptions = {
    uri: process.env.DATABASE_URL || '',
    options: {
        useNewUrlParser: true,
        reconnectInterval: 500,
        reconnectTries: Number.MAX_VALUE,
        poolSize: 5,
        connectTimeoutMS: 10000
    }
};

export let musicOptions = {
    host: process.env.HOST as string,
    pass: 'youshallnotpass',
    port: '/',
    nodes: [{
        host: process.env.HOST as string,
        port: '/',
        password: 'youshallnotpass'
    }]
};
