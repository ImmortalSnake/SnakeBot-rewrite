import { Extendable, ExtendableStore } from 'klasa';
import { User, ImageSize } from 'discord.js';
import fetch from 'node-fetch';

export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, {
            appliesTo: [User]
        });

    }

    public async fetchAvatar(this: User, size: ImageSize) {
        const url = this.avatar ? this.avatarURL({ format: 'png', size })! : this.defaultAvatarURL;
        return fetch(url).then(res => res.buffer());
    }

}
