import { TextChannel } from 'discord.js';
import SnakeBot from '../client';
import AkinatorAPI from '../../apis/Akinator';

export default class Akinator {

    public aki: AkinatorAPI;
    public sessions: Map<string, SessionData>;
    public constructor(client: SnakeBot) {
        this.aki = client.apis.get('Akinator') as AkinatorAPI;
        this.sessions = new Map();
    }

    public async progress(channel: TextChannel, answer: number) {
        const session = this.sessions.get(channel.id)!;
        const body = await this.aki.answer(session.id, session.signature, session.step, answer);

        if (!body || !body.parameters) throw 'Sorry! Could not load akinator... Try again later';

        this.sessions.set(channel.id, {
            id: session.id,
            signature: session.signature,
            step: session.step + 1,
            progression: parseInt(body.parameters.progression, 10)
        });

        return body.parameters;
    }

    public async guess(channel: TextChannel) {
        const session = this.sessions.get(channel.id)!;
        const body = await this.aki.list(session.id, session.signature, session.step, {
            size: 2,
            max_pic_width: 246,
            max_pic_height: 294,
            pref_photos: 'VO-OK',
            duel_allowed: 1,
            mode_question: 0
        });

        return body.parameters?.elements[0]?.element;
    }

    public async createSession(channel: TextChannel) {
        const body = await this.aki.start(channel.nsfw);
        if (!body || !body.parameters) throw 'Sorry! Could not load akinator... Try again later';

        const { identification, step_information } = body.parameters;
        this.sessions.set(channel.id, {
            id: identification.session,
            signature: identification.signature,
            step: parseInt(step_information.step, 10),
            progression: parseInt(step_information.progression, 10)
        });

        return step_information;
    }

}

interface SessionData {
    id: string;
    signature: string;
    step: number;
    progression: number;
}
