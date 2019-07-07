import { KlasaMessage } from 'klasa';
import AudioTrack from './track';
import { Player, LavalinkNode, PlayerOptions } from 'discord.js-lavalink';

export default class LavaAudioPlayer extends Player {
    next: any[];
    reqs: Map<any, any>;
    repeat: boolean;
    current: null | AudioTrack;
    message: null | KlasaMessage;
    basslvl: string;
    last: any[];

    constructor(node: LavalinkNode, options: PlayerOptions) {
        super(node, options);
        this.next = [];
        this.last = [];
        this.reqs = new Map();
        this.repeat = false;
        this.current = null;
        this.message = null;
        this.basslvl = 'none';
    }
}
