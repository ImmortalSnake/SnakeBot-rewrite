import { KlasaClient } from 'klasa';

export default KlasaClient.defaultClientSchema
    .add('commandUses', 'integer', { 'default': 0, 'configurable': false });
