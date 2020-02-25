import { KlasaClient } from 'klasa';

export default KlasaClient.defaultUserSchema
    .add('afk', folder => folder
        .add('reason', 'string', { configurable: false })
        .add('time', 'number', { configurable: false }));
