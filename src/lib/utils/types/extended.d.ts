/* eslint-disable @typescript-eslint/member-ordering */
import { MessagePromptOptions } from '../../../extendables/Message';
import { ShoukakuNodeOptions } from 'shoukaku';
import { Client } from 'discord.js';

declare module 'discord.js' {
    interface Message {
        public prompt(content: string, options?: MessagePromptOptions): Promise<Message>;
        public ask(content: string, options?: MessageAskOptions): Promise<boolean>;
    }
}

declare module 'shoukaku' {
    interface Shoukaku {
        // eslint-disable-next-line @typescript-eslint/no-misused-new
        constructor(client: Client, nodes: ShoukakuNodeOptions, options: ShoukakuOptions): this;
    }
}
