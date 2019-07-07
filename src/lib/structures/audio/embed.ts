import AudioTrack from './track';
import { MessageEmbed, ClientUser, User } from 'discord.js';
import { KlasaClient } from 'klasa';

export default class AudioEmbed extends MessageEmbed {
    constructor(client: KlasaClient, track: AudioTrack) {
        super();
        this.setAuthor((client.user as ClientUser).username, (client.user as ClientUser).displayAvatarURL());
        this.setURL(track.uri);
        this.setTitle(track.title);
        this.setThumbnail(track.thumbnail);
        this.setColor('BLUE');
        this.addField('Requestor', (client.users.get(track.requester) as User).toString());
        this.addField('Author', track.author);
    }
}
