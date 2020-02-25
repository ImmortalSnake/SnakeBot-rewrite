import { Client, SchemaFolder } from 'klasa';
import { Hour } from '../../utils/constants';

export default Client.defaultGuildSchema
    .add('automeme', (folder: SchemaFolder) => folder
        .add('limit', 'number', { configurable: false })
        .add('channel', 'channel', { configurable: false }))

    .add('message', (folder: SchemaFolder) => folder
        .add('welcome', 'string', { 'max': 2000, 'default': 'Hi {user}, welcome to {guild}' })
        .add('leave', 'string', { 'max': 2000, 'default': '{username} has left, it was nice knowing you' }))

    .add('channels', folder => folder
        .add('log', 'textchannel')
        .add('modlog', 'textchannel')
        .add('welcome', 'textchannel')
        .add('reports', 'textchannel')
        .add('leave', 'textchannel'))

    .add('roles', folder => folder
        .add('mute', 'Role')
        .add('auto', 'Role', { array: true })
        .add('dj', 'Role', { array: true }))

    .add('modlogs', 'any', { array: true, configurable: false })

    .add('starboard', folder => folder
        .add('required', 'Number', { 'min': 1, 'default': 5 })
        .add('emoji', 'string', { 'default': '⭐' })
        .add('channel', 'textchannel')
        .add('messages', 'string', { 'array': true, 'default': [], 'configurable': false }))

    .add('music', folder => folder
        .add('volume', 'Number', { 'min': 0, 'max': 200, 'default': 100 })
        .add('maxduration', 'Number', { 'min': 0, 'max': Hour * 4, 'default': Hour * 2 })
        .add('maxentries', 'Number', { 'min': 1, 'max': 100, 'default': 25 })
        .add('allowstreams', 'Boolean', { 'default': true }));
