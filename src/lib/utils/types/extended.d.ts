/* eslint-disable @typescript-eslint/member-ordering */
import { MessagePromptOptions } from '../../../extendables/Message';
import { MessageEmbed } from 'discord.js';
import AudioPlayer from '../../structures/audio/AudioPlayer';

declare module 'discord.js' {
    interface Message {
        public prompt(content: string | MessageEmbed, options?: MessagePromptOptions): Promise<Message>;
        public ask(content: string | MessageEmbed, options?: MessageAskOptions): Promise<boolean>;
    }

    interface GuildMember {
        public isDJ: boolean;
    }

    interface Guild {
        public audio: AudioPlayer | undefined;
    }
}
