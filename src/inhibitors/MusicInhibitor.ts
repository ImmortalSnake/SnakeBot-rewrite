import { Inhibitor, InhibitorStore, KlasaMessage, Command } from 'klasa';
import MusicCommand from '../lib/structures/base/MusicCommand';
import SnakeBot from '../lib/client';

export default class extends Inhibitor {

    public constructor(store: InhibitorStore, file: string[], directory: string) {
        super(store, file, directory, {
            spamProtection: true
        });
    }

    public run(msg: KlasaMessage, command: Command | MusicCommand) {
        if (!(command instanceof MusicCommand) || !command.music.length) return;
        if (!msg.guild) return;

        const audio = (this.client as SnakeBot).audio.players.get(msg.guild.id);

        if (command.music.includes('DJ_REQUIRED') && !msg.member?.isDJ) throw `You need to have the DJ Role or Admin permissions to use this command`;
        if (command.music.includes('VOICE_PLAYING') && !audio?.player.playing) throw `I am not playing anything!`;
        if (command.music.includes('QUEUE_NOT_EMPTY') && !audio?.tracks.length) throw `Queue for this guild is empty! Try adding some to the queue`;

        if (command.music.includes('USER_VC') && !msg.member?.voice.channelID) throw `You are not in any voice channel, Join one to use this command`;
        if (command.music.includes('SNAKE_VC') && !msg.guild.me?.voice.channelID) throw `I am not in any voice channel`;

        if (command.music.includes('SAME_VC') && msg.member?.voice.channelID
        && msg.guild.me?.voice.channelID !== msg.member?.voice.channelID) throw `Hey! I am in a different voice channel!`;
    }

}
