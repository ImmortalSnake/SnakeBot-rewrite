require('dotenv').config();

import options from './config';
import SnakeBot from './lib/client';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
new SnakeBot(options).login(process.env.TOKEN);

// eslint-disable-next-line @typescript-eslint/unbound-method
process.on('unhandledRejection', console.log);
// eslint-disable-next-line @typescript-eslint/unbound-method
process.on('uncaughtException', console.log);
