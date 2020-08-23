import { Client } from 'klasa';
import { Hour } from '../../utils/constants';

export default Client.defaultGuildSchema
    .add('automeme', folder => folder
        .add('limit', 'number', { configurable: false })
        .add('channel', 'channel', { configurable: false }))

    .add('automod', folder => folder
        .add('invites', 'boolean', { 'default': false })
        .add('links', 'boolean', { 'default': false })
        .add('ignorestaff', 'boolean', { 'default': true }))

    .add('message', folder => folder
        .add('welcome', 'string', { 'max': 2000, 'default': 'Hi {user}, welcome to {guild}' })
        .add('leave', 'string', { 'max': 2000, 'default': '{username} has left, it was nice knowing you' }))

    .add('channels', folder => folder
        .add('log', 'textchannel')
        .add('modlog', 'textchannel')
        .add('welcome', 'textchannel')
        .add('reports', 'textchannel')
        .add('leave', 'textchannel')
        .add('announce', 'textchannel'))

    .add('roles', folder => folder
        .add('mute', 'Role')
        .add('announce', 'Role')
        .add('auto', 'Role', { 'array': true, 'default': [] })
        .add('dj', 'Role', { 'array': true, 'default': [] })
        .add('selfroles', 'Role', { 'array': true, 'default': [] }))

    .add('modlogs', 'any', { 'array': true, 'configurable': false, 'default': [] })
    .add('tags', 'any', { 'array': true, 'configurable': false, 'default': [] })

    .add('starboard', folder => folder
        .add('required', 'Number', { 'min': 3, 'default': 5 })
        .add('emoji', 'string', { 'default': '⭐' })
        .add('channel', 'textchannel')
        .add('messages', 'string', { 'array': true, 'default': [], 'configurable': false }))

    .add('music', folder => folder
        .add('volume', 'Number', { 'min': 0, 'max': 200, 'default': 100 })
        .add('maxduration', 'Number', { 'min': 0, 'max': Hour * 3, 'default': Hour })
        .add('maxentries', 'Number', { 'min': 1, 'max': 100, 'default': 25 })
        .add('allowstreams', 'Boolean', { 'default': true })
        .add('announcesongs', 'Boolean', { 'default': false })
        .add('preventduplicates', 'Boolean', { 'default': false }));
