import { Finalizer } from 'klasa';

export default class extends Finalizer {

    public async run() {
        const count = this.client.settings!.get('commandUses') as number;
        await this.client.settings!.update('commandUses', count + 1);
    }

}
