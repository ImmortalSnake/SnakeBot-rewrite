"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const url_1 = require("url");
const Util_1 = __importDefault(require("../utils/Util"));
let sessions = new Map();
class Akinator {
    getURL(type = '', object = {}) {
        const url = new url_1.URL(`https://srv6.akinator.com:9126/ws/${type}`);
        for (const [key, val] of Object.entries(object))
            url.searchParams.append(key, val);
        return url.toString();
    }
    play(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sessions.has(msg.channel.id))
                throw 'Only one game may be occuring per channel.';
            sessions.set(msg.channel.id, { progression: 0 });
            let ans = null;
            while (sessions.get(msg.channel.id).progression < 95) {
                const data = ans === null ? yield this.createSession(msg.channel) : yield this.progress(msg.channel, ans);
                if (!data || !data.answers || sessions.get(msg.channel.id).step >= 80)
                    break;
                const answers = data.answers.map((answer) => answer.answer.toLowerCase());
                answers.push('end');
                yield msg.channel.send(new discord_js_1.MessageEmbed()
                    .setColor('0xF78B26')
                    .setDescription(`**${++data.step}.** ${data.question}  (${Math.round(Number.parseInt(data.progression, 10))}%)
${data.answers.map((answer) => answer.answer).join(' | ')}`));
                const filter = (res) => res.author.id === msg.author.id && answers.includes(res.content.toLowerCase());
                const msgs = yield msg.channel.awaitMessages(filter, { max: 1, time: 180000 });
                if (!msgs.size)
                    throw 'Sorry, time is up!';
                if (msgs.first().content.toLowerCase() === 'end')
                    break;
                ans = answers.indexOf(msgs.first().content.toLowerCase());
            }
            const guess = yield this.guess(msg.channel);
            if (!guess) {
                sessions.delete(msg.channel.id);
                if (guess === 0)
                    return msg.channel.send('I don\'t have any guesses. Bravo.');
                return msg.channel.send('Hmm... I seem to be having a bit of trouble. Check back soon!');
            }
            yield msg.channel.send(new discord_js_1.MessageEmbed()
                .setColor(0xF78B26)
                .setTitle(`I'm ${Math.round(guess.proba * 100)}% sure it's...`)
                .setDescription(`${guess.name}${guess.description ? `\n_${guess.description}_` : ''}`)
                .setImage(guess.absolute_picture_path || null)
                .setFooter('Is this your character? (y/n)'));
            const verification = yield new Util_1.default().verify(msg.channel, msg.author);
            sessions.delete(msg.channel.id);
            if (verification === 0)
                return msg.channel.send('I guess your silence means I have won.');
            if (!verification)
                return msg.channel.send('Bravo, you have defeated me.');
            return msg.channel.send('Guessed right one more time! I love playing with you!');
        });
    }
    progress(channel, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = sessions.get(channel.id);
            const res = yield node_fetch_1.default(this.getURL('answer', {
                session: session.id,
                signature: session.signature,
                step: session.step,
                answer,
                question_filter: channel.nsfw ? '' : 'cat=1'
            }));
            const body = yield res.json();
            if (!body || !body.parameters)
                return null;
            const data = body.parameters;
            sessions.set(channel.id, {
                id: session.id,
                signature: session.signature,
                step: Number.parseInt(data.step, 10),
                progression: Number.parseInt(data.progression, 10)
            });
            return data;
        });
    }
    guess(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = sessions.get(channel.id);
            const res = yield node_fetch_1.default(this.getURL('list', {
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
            const body = yield res.json();
            console.log(body);
            if (!body || !body.parameters || body.completion !== 'KO - ELEM LIST IS EMPTY')
                return null;
            return body.parameters.elements[0].element;
        });
    }
    createSession(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(this.getURL('new_session', {
                partner: '',
                player: 'website-desktop',
                uid_ext_session: '',
                frontaddr: 'NDYuMTA1LjExMC40NQ==',
                constraint: 'ETAT<>\'AV\'',
                soft_constraint: channel.nsfw ? '' : 'ETAT=\'EN\'',
                question_filter: channel.nsfw ? '' : 'cat=1'
            }));
            const body = yield res.json();
            if (!body || !body.parameters)
                return null;
            const data = body.parameters;
            sessions.set(channel.id, {
                id: data.identification.session,
                signature: data.identification.signature,
                step: 0,
                progression: Number.parseInt(data.step_information.progression, 10)
            });
            return data.step_information;
        });
    }
}
exports.default = Akinator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWtpbmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0dhbWVzL2FraW5hdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0U7QUFDdEUsNERBQStCO0FBQy9CLDZCQUEwQjtBQUUxQix5REFBaUM7QUFFakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV6QixNQUFxQixRQUFRO0lBRWpCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxFQUFFO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxDQUFDLHFDQUFxQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFhLENBQUMsQ0FBQztRQUM3RixPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVksSUFBSSxDQUFDLEdBQWlCOztZQUMvQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQUUsTUFBTSw0Q0FBNEMsQ0FBQztZQUNyRixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBRWYsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRTtnQkFDbEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFD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