import APIWrapper from '../lib/structures/base/APIWrapper';
import APIWrapperStore from '../lib/structures/base/APIWrapperStore';
import fetch from 'node-fetch';
import { util } from 'klasa';

export default class AkinatorAPI extends APIWrapper {

    public constructor(store: APIWrapperStore, file: string[], directory: string) {
        super(store, file, directory, {
            apiURL: 'https://srv2.akinator.com:9162/ws'
        });
    }

    public async start(nsfw?: boolean) {
        const [uid_ext_session, frontaddr] = await this.getSession();
        const params = new URLSearchParams({
            partner: '1',
            player: 'website-desktop',
            uid_ext_session,
            frontaddr,
            constraint: `ETAT<>'AV'`,
            soft_constraint: nsfw ? '' : 'ETAT=\'EN\'',
            question_filter: nsfw ? '' : 'cat=1'
        });

        return this.fetch('new_session', params)
            .then((body: AkiStartResult) => body);
    }

    public async answer(session: string, signature: string, step: number | string, answer: number | string) {
        const params = new URLSearchParams({
            session,
            signature,
            step: step.toString(),
            answer: answer.toString()
        });

        return this.fetch('answer', params)
            .then((body: AkiAnswerResult) => body);
    }

    public async list(session: string, signature: string, step: string | number, options = {}) {
        const params = new URLSearchParams(util.mergeObjects({
            session,
            signature,
            step: step.toString()
        }, options));

        return this.fetch('list', params)
            .then((body: AkiListResult) => body);
    }

    private async getSession() {
        const regex = new RegExp("var uid_ext_session = '(.*)';\\n.*var frontaddr = '(.*)';");
        return fetch('https://en.akinator.com/game')
            .then(res => res.text())
            .then(text => regex.exec(text)!.slice(1, 3));
    }

    private async fetch(endpoint = '', params: URLSearchParams = new URLSearchParams()) {
        params.append('callback', `callback=jQuery331023608747682107778_${new Date().getTime()}`);

        const res = await fetch(`${this.apiURL}/${endpoint}?${params.toString()}`);

        const body = await res.text();
        return JSON.parse(body.substring(body.indexOf('(') + 1, body.length - 1));
    }

}


interface AkiStartResult {
    completion: string;
    parameters: AkiStartResultParameters;
}

interface AkiStartResultParameters {
    identification: {
        channel: number;
        session: string;
        signature: string;
        challenge_auth: string;
    };
    step_information: AkiStepInformation;
}

interface AkiStepInformation {
    question: string;
    answers: AkiAnswer[];
    step: string;
    progression: string;
    questionid: string;
    infogain: string;
}

interface AkiAnswer {
    answer: string;
}

interface AkiAnswerResult {
    completion: string;
    parameters: AkiAnswerParameters;
}

interface AkiAnswerParameters extends AkiStepInformation {
    status_minibase: string;
    options: any[];
}
/*
interface AkiListOptions extends Record<string, string | undefined> {
    size?: string;
    max_pic_width?: string;
    max_pic_height?: string;
    pref_photos?: string;
    duel_allowed?: string;
    mode_question?: string;
}
*/
interface AkiListResult {
    completion: string;
    parameters: {
        elements: AkiListElements[];
        NbObjetsPertinents: string;
    };
}

interface AkiListElements {
    element?: {
        id: string;
        name: string;
        id_base: string;
        proba: string;
        description?: string;
        valide_constrainte: string;
        ranking: string;
        psuedo: string;
        picture_path?: string;
        corrupt: string;
        relative: string;
        flag_photo: string;
        absolute_picture_path?: string;
    };
}
