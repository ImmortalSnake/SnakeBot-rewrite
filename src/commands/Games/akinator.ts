import { CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed, Message, TextChannel } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import Akinator from '../../lib/Games/akinator';

export default class extends SnakeCommand {

    public aki: Akinator;
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['aki'],
            cooldown: 10,
            cooldownLevel: 'channel'
        });

        this.aki = new Akinator(this.client);
    }

    public async run(msg: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
        if (this.aki.sessions.has(msg.channel.id)) throw msg.language.get('CHANNEl_MULTIPLE_GAME');
        let ans: number | null = null;

        while ((this.aki.sessions.get(msg.channel.id)?.progression || 0) < 95) {
            const data = ans === null ? await this.aki.createSession(msg.channel as TextChannel) : await this.aki.progress(msg.channel as TextChannel, ans);
            if (!data || !data.answers || this.aki.sessions.get(msg.channel.id)!.step >= 80) break;

            const answers: string[] = data.answers.map(ans => ans.answer.toLowerCase());
            answers.push('end');

            await msg.channel.send(new MessageEmbed()
                .setColor('0xF78B26')
                .setDescription(`**${Number(data.step) + 1}.** ${data.question}  (${Math.round(Number.parseInt(data.progression, 10))}%)
${data.answers.map(ans => ans.answer).join(' | ')}`));

            const filter = (res: Message) => res.author!.id === msg.author!.id && answers.includes(res.content.toLowerCase());
            const msgs = await msg.channel.awaitMessages(filter, { max: 1, time: 180000 });

            if (!msgs.size) throw msg.language.get('TIME_UP');
            if (msgs.first()!.content.toLowerCase() === 'end') break;

            ans = answers.indexOf(msgs.first()!.content.toLowerCase());
        }

        const guess = await this.aki.guess(msg.channel as TextChannel);
        this.aki.sessions.delete(msg.channel.id);
        if (!guess) return msg.sendLocale('COMMAND_AKINATOR_NO_GUESS');

        return msg.ask(new MessageEmbed()
            .setColor(0xF78B26)
            .setTitle(`I'm ${Math.round(Number(guess.proba) * 100)}% sure it's...`)
            .setDescription(`${guess.name}${guess.description ? `\n_${guess.description}_` : ''}`)
            .setImage(guess.absolute_picture_path ?? '')
            .setFooter('React Below!'))
            .then(verification => {
                if (!verification) return msg.send('Bravo, you have defeated me.');
                return msg.send('Guessed right one more time! I love playing with you!');
            }).catch(() => {
                throw 'I guess your silence means I have won.';
            });
    }

}
