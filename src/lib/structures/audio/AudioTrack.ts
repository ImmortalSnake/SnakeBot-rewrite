interface AudioTrackInfo {
    identifier: string;
    isSeekable: boolean;
    author: string;
    length: number;
    isStream: boolean;
    position: number;
    title: string;
    url: string;
}

export default class AudioTrack {

    public track: string;
    public info: AudioTrackInfo;

    public constructor(data: any) {
        this.track = data.track;
        this.info = data.info;
    }

}
