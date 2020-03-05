import { KlasaMessage, CommandStore } from 'klasa';
import MusicCommand from '../../lib/structures/base/MusicCommand';
import { VoiceChannel } from 'discord.js';

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['connect'],
            music: ['USER_VC'],
            requiredPermissions: ['CONNECT', 'SPEAK']
        });
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        const { channel } = msg.member!.voice;

        if (msg.guild!.me?.voice.channelID) {
            if (channel!.id === msg.guild!.me?.voice.channelID) throw msg.language.get('COMMAND_JOIN_VOICE_SAME');
            throw msg.language.get('COMMAND_JOIN_VOICE_DIFFERENT');
        }

        this.resolvePermissions(msg, channel!);
        await msg.guild!.audio.join(channel!);
        return msg.sendLocale('COMMAND_JOIN_SUCCESS', [channel!.toString()]);
    }

    public resolvePermissions(message: KlasaMessage, voiceChannel: VoiceChannel): void {
        const permissions = voiceChannel.permissionsFor(message.guild!.me!)!;

        // Administrators can join voice channels even if they are full
        if (voiceChannel.full && !permissions.has('ADMINISTRATOR')) throw message.language.get('COMMAND_JOIN_VOICE_FULL');
        if (!permissions.has('CONNECT')) throw message.language.get('COMMAND_JOIN_VOICE_NO_CONNECT');
        if (!permissions.has('SPEAK')) throw message.language.get('COMMAND_JOIN_VOICE_NO_SPEAK');
    }

}
