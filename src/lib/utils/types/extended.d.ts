/* eslint-disable @typescript-eslint/member-ordering */
import { MessagePromptOptions, MessageAskOptions } from '../../../extendables/Message';
import { MessageEmbed, ImageSize } from 'discord.js';

declare module 'discord.js' {
    interface Message {
        public prompt(content: string | MessageEmbed, options?: MessagePromptOptions): Promise<Message>;
        public ask(content: string | MessageEmbed, options?: MessageAskOptions): Promise<boolean>;
    }

    interface GuildMember {
        public isDJ(): boolean;
    }

    interface User {
        public fetchAvatar(size: ImageSize): Promise<Buffer>;
    }
}

declare module 'canvas-constructor' {
    interface Canvas {
        public measureText(text: string): TextMetrics;
        public measureText(text: string, callback: (metrics: TextMetrics, instance: Canvas) => unknown): Canvas;
    }
}

declare module 'klasa' {
    interface Serializer {
        public stringify(data: any, message?: KlasaMessage): string;
    }
}
