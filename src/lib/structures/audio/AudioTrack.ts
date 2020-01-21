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

    public constructor(data: any) {
        this.track = data.track;
        this.info = data.info;
    }

    public get friendlyDuration() {
        return Util.msToDuration(this.info.length);
    }

}
