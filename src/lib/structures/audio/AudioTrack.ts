import Util from '../../utils/Util';

interface AudioTrackInfo {
    identifier: string;
    isSeekable: boolean;
    author: string;
    length: number;
    isStream: boolean;
    position: number;
    title: string;
    uri: string;
}

export default class AudioTrack {

    public track: string;
    public info: AudioTrackInfo;
    public requester = '';
    public skippers: string[] = [];

    public constructor(data: any) {
        this.track = data.track;
        this.info = data.info;
    }

    public get friendlyDuration() {
        return Util.msToDuration(this.info.length);
    }

    public totalDuration(position = 0) {
        return `${Util.formatDuration(position)} / ${Util.formatDuration(this.info.length)}`;
    }

    public playingForBar(position = 0) {
        const length = 32;
        const part = Math.floor((position / this.info.length) * length);

        return `${'▬'.repeat(part)}🔘${'▬'.repeat(length - part)}`;
    }

}
