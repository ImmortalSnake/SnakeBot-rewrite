import { TextChannel, User, Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { URL } from 'url';
import { KlasaMessage } from 'klasa';
import Util from '../utils/Util';

const sessions = new Map();

export default class Akinator {

    public async play(msg: KlasaMessage) {
        if (sessions.has(msg.channel.id)) throw 'Only one game may be occuring per channel.';
        sessions.set(msg.channel.id, { progression: 0 });
        let ans = null;

        while (sessions.get(msg.channel.id).progression < 95) {
            const data = ans === null ? await this.createSession(msg.channel as TextChannel) : await this.progress(msg.channel as TextChannel, ans);
            if (!data || !data.answers || sessions.get(msg.channel.id).step >= 80) break;

            const answers: any = data.answers.map((answer: any) => answer.answer.toLowerCase());
            answers.push('end');

            await msg.channel.send(new MessageEmbed()
                .setColor('0xF78B26')
                .setDescription(`**${++data.step}.** ${data.question}  (${Math.round(Number.parseInt(data.progression, 10))}%)
${data.answers.map((answer: any) => answer.answer).join(' | ')}`));

            const filter = (res: Message) => (res.author as User).id === (msg.author as User).id && answers.includes(res.content.toLowerCase());
            const msgs = await msg.channel.awaitMessages(filter, { max: 1, time: 180000 });

            if (!msgs.size) throw 'Sorry, time is up!';
            if ((msgs.first() as Message).content.toLowerCase() === 'end') break;

            ans = answers.indexOf((msgs.first() as Message).content.toLowerCase());
        }

        const guess = await this.guess(msg.channel as TextChannel);
        if (!guess) {
            sessions.delete(msg.channel.id);
            if (guess === 0) return msg.channel.send('I don\'t have any guesses. Bravo.');
            return msg.channel.send('Hmm... I seem to be having a bit of trouble. Check back soon!');
        }

        await msg.channel.send(new MessageEmbed()
            .setColor(0xF78B26)
            .setTitle(`I'm ${Math.round(guess.proba * 100)}% sure it's...`)
            .setDescription(`${guess.name}${guess.description ? `\n_${guess.description}_` : ''}`)
            .setImage(guess.absolute_picture_path || null)
            .setFooter('Is this your character? (y/n)'));

        const verification = await new Util().verify(msg.channel as TextChannel, msg.author as User);
        sessions.delete(msg.channel.id);

        if (verification === 0) return msg.channel.send('I guess your silence means I have won.');
        if (!verification) return msg.channel.send('Bravo, you have defeated me.');

        return msg.channel.send('Guessed right one more time! I love playing with you!');
    }

    public async progress(channel: TextChannel, answer: string) {
        const session = sessions.get(channel.id);
        const res = await fetch(this.getURL('answer', {
            session: session.id,
            signature: session.signature,
            step: session.step,
            answer,
            question_filter: channel.nsfw ? '' : 'cat=1'
        }));

        const body = await res.json();
        if (!body || !body.parameters) return null;

        const data = body.parameters;
        console.log(session, data, res.url);
        sessions.set(channel.id, {
            id: session.id,
            signature: session.signature,
            step: parseInt(data.step, 10),
            progression: parseInt(data.progression, 10)
        });
        return data;
    }

    public async guess(channel: TextChannel) {
        const session = sessions.get(channel.id);
        const res = await fetch(this.getURL('list', {
            session: session.id,
            signature: session.signature,
            step: session.step,
            size: 2,
            max_pic_width: 246,
            max_pic_height: 294,
            pref_photos: 'VO-OK',
            duel_allowed: 1,
            mode_question: 0
        }));

        const body = await res.json();
        console.log(session, res.url, body);
        if (!body || !body.parameters || body.completion !== 'KO - ELEM LIST IS EMPTY') return null;

        return body.parameters.elements[0].element;
    }

    public async createSession(channel: TextChannel) {
        const res = await fetch(this.getURL('new_session', {
            partner: '',
            player: 'website-desktop',
            uid_ext_session: '',
            frontaddr: 'NDYuMTA1LjExMC40NQ==',
            constraint: 'ETAT<>\'AV\'',
            soft_constraint: channel.nsfw ? '' : 'ETAT=\'EN\'',
            question_filter: channel.nsfw ? '' : 'cat=1'
        }));

        const body = await res.json();
        if (!body || !body.parameters) return null;

        const data = body.parameters;
        console.log(data);
        sessions.set(channel.id, {
            id: data.identification.session,
            signature: data.identification.signature,
            step: parseInt(data.step_information.step, 10),
            progression: parseInt(data.step_information.progression, 10)
        });

        return data.step_information;
    }

    private getURL(type = '', object = {}): string {
        const url = new URL(`https://srv6.akinator.com:9126/ws/${type}`);

        for (const [key, val] of Object.entries(object)) {
            url.searchParams.append(key, val as string);
        }
        return url.toString();
    }

}
