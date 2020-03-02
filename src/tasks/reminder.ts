import { Task } from 'klasa';

interface ReminderOptions {
    user: string;
    text: string;
}

export default class extends Task {

    public async run({ user, text }: ReminderOptions) {
        const _user = await this.client.users.fetch(user);
        if (_user) await _user.send(`**Reminder:** \`${text}\``).catch(() => null);
    }

}
