import SnakeBot from '../../client';
import { ShoukakuSocket, Track } from 'shoukaku';
import { KlasaMessage } from 'klasa';
import LavaDispatcher from './dispatcher';
import { TextChannel } from 'discord.js';

export default class Queue extends Map {

    public client: SnakeBot;

    constructor(client: SnakeBot) {
        super();

        this.client = client;
    }

    async handle(node: ShoukakuSocket, track: Track, msg: KlasaMessage) {
        const existing = this.get(msg.guild!.id);
        if (!existing) {
            const player = await node.joinVoiceChannel({
                guildID: msg.guild!.id,
                voiceChannelID: msg.member!.voice.channelID!
            });

            const dispatcher = new LavaDispatcher({
                manager: this.client.audio,
                guild: msg.guild!,
                chan: msg.channel! as TextChannel,
                player
            });

            dispatcher.queue.push(track);
            this.set(msg.guild!.id, dispatcher);

            return dispatcher;
        }

        existing.queue.push(track);
        return null;
    }

}
