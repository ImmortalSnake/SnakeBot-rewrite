import { Task } from 'klasa';

export default class extends Task {

    public async run({ guildID, userID }: { guildID: string; userID: string}) {
        return this.client.guilds.resolve(guildID)?.members.unban(userID).catch(() => null);
    }

}
