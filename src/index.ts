require('dotenv').config();

import options from './config';
import SnakeBot from './lib/client';

const client = new SnakeBot(options);
client.login(process.env.TOKEN);

process.on('unhandledRejection', console.log);
process.on('uncaughtException', console.log);
