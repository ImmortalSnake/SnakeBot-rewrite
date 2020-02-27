import { Middleware, MiddlewareStore, KlasaIncomingMessage } from 'klasa-dashboard-hooks';
import { ServerResponse } from 'http';

export default class extends Middleware {

    public constructor(store: MiddlewareStore, file: string[], directory: string) {
        super(store, file, directory, { priority: 10 });
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async run(req: KlasaIncomingMessage, res: ServerResponse) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, User-Agent, Content-Type');
        res.setHeader('Content-Type', 'application/json; charset=utf-8');

        if (req.method === 'OPTIONS') return res.end('{"success": true}');
    }

}
