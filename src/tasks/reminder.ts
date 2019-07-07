import { Task, KlasaUser } from 'klasa';

interface ReminderOptions {
    user: KlasaUser;
    text: string;
}

export default class extends Task {
    async run({ user, text }: ReminderOptions) {
        if (user) await user.send(`Reminder: ${text}`).catch(e => console.log(e));
    }
}
