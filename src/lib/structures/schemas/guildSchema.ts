import { Client, SchemaFolder } from 'klasa';

Client.defaultGuildSchema
    .add('automeme', (folder: SchemaFolder) => folder
        .add('limit', 'number', { configurable: false })
        .add('channel', 'channel', { configurable: false }))

    .add('afkusers', 'any', { array: true })
    .add('message', (folder: SchemaFolder) => folder
        .add('welcome', 'message', { configurable: true }))

    .add('channels', (folder: SchemaFolder) => folder
        .add('log', 'textchannel', { configurable: true })
        .add('welcome', 'textchannel', { configurable: true }))

    .add('roles', (folder: SchemaFolder) => folder
        .add('mute', 'Role', { configurable: true })
        .add('auto', 'Role', { configurable: true }))

    .add('modlogs', (folder: SchemaFolder) => folder
        .add('total', 'number', { 'configurable': false, 'default': 0 })
        .add('cases', 'any', { array: true, configurable: false }));
