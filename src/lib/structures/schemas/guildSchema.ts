import { Client, SchemaFolder } from 'klasa';
import { Hour } from '../../utils/constants';

export default Client.defaultGuildSchema
    .add('automeme', (folder: SchemaFolder) => folder
        .add('limit', 'number', { configurable: false })
        .add('channel', 'channel', { configurable: false }))

    .add('afkusers', 'any', { array: true })
    .add('message', (folder: SchemaFolder) => folder
        .add('welcome', 'string', { max: 2000 })
        .add('leave', 'string', { max: 2000 }))

    .add('channels', (folder: SchemaFolder) => folder
        .add('log', 'textchannel', { configurable: true })
        .add('welcome', 'textchannel', { configurable: true })
        .add('reports', 'textchannel'))

    .add('roles', (folder: SchemaFolder) => folder
        .add('mute', 'Role', { configurable: true })
        .add('auto', 'Role', { configurable: true })
        .add('dj', 'Role', { configurable: true }))

    .add('modlogs', (folder: SchemaFolder) => folder
        .add('total', 'number', { 'configurable': false, 'default': 0 })
        .add('cases', 'any', { array: true, configurable: false }))

    .add('music', folder => folder
        .add('default-volume', 'Number', { 'min': 0, 'max': 200, 'default': 100 })
        .add('maximum-duration', 'Number', { 'min': 0, 'max': Hour * 4, 'default': Hour * 2 })
        .add('maximum-entries-per-user', 'Number', { 'min': 1, 'max': 100, 'default': 25 })
        .add('allow-streams', 'Boolean', { 'default': true }));
