require('dotenv').config();

import options from './config';
import SnakeBot from './lib/client';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
new SnakeBot(options).login(process.env.TOKEN);

process.on('unhandledRejection', reason => console.log(reason));
process.on('uncaughtException', error => console.log(error));
