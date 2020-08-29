import { Route, RouteStore, KlasaIncomingMessage } from 'klasa-dashboard-hooks';
import { ServerResponse } from 'http';
import { util } from 'klasa';

export default class extends Route {

    public constructor(store: RouteStore, file: string[], directory: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        super(store, file, directory, { route: 'commands' });
    }

    public get(request: KlasaIncomingMessage, response: ServerResponse) {
        const { category } = request.query;
        const commands = category ? this.client.commands.filter(cmd => cmd.category === category) : this.client.commands;
        return response.end(JSON.stringify(commands.filter(cmd => cmd.enabled && cmd.permissionLevel < 9)
            .map(cmd => ({
                name: cmd.name,
                category: cmd.category,
                description: util.isFunction(cmd.description) ? cmd.description(this.client.languages.default) : cmd.description,
                usage: cmd.usageString,
                guildOnly: !cmd.runIn.includes('dm'),
                requiredPermissions: cmd.requiredPermissions.toArray()
            }))));
    }

}
