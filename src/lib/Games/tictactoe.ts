import { Client, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import SnakeBot from '../client';

export default class TicTacToe {

    client: SnakeBot;
    AI: boolean;
    comp: string | null;
    player1: string;
    player2: string | null;
    first: string;
    difficulty: number;
    pval: string[] | null;
    players: string[] | null;

    public board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    public dict = {
        X: ':x:',
        O: ':o:'
    };

    constructor(client: SnakeBot, AI: boolean) {

        this.client = client;
        this.AI = AI;
        this.player1 = 'O';
        this.comp = AI ? 'X' : null;
        this.player2 = AI ? null : 'X';
        this.pval = this.comp ? [this.comp, this.player1] : null;
        this.first = this.player1;
        this.difficulty = 0;
        this.players = [];

    }

    public async play(msg: KlasaMessage, players: string[]) {
        this.players = players;
        if (this.AI) {
            let difficulty = await msg.prompt('Select Difficulty:\n1 - Easy\n2 - Medium\n3 - Impossible')
            .then(r => r.content)
            .catch(e => { return e; });

            difficulty = parseInt(`${difficulty}`);
            if (!difficulty || difficulty > 3 || difficulty < 1) return msg.send('Invalid Difficulty Level');
            this.difficulty = difficulty;
        }
        let res = await this.move(msg).catch(e => { return e; });
        return res;
    }

    private async move(msg: KlasaMessage): Promise<string> {
        if (this.first !== this.comp) await msg.channel.send(this.getBoard(this.board));

        if (this.verifyWin(this.board, 'X')) return 'X has won';
        else if (this.verifyWin(this.board, 'O')) return 'O has won';
        else if (this.board.filter(s => parseInt(s)).length === 0) return 'Its A Tie';

        let m;
        if (this.AI && this.comp === this.first) m = this.AIMove();
        else m = await this.playerMove(msg, this.first).catch(e => { throw e; });
        this.board[m] = this.first;
        if (this.first === 'O') this.first = 'X';
        else this.first = 'O';

        if (this.players) this.players.reverse();
        return this.move(msg);
    }

    private async playerMove(msg: KlasaMessage, player: string): Promise<number> {
        let m = await this.prompt(msg, 'Enter A Number From 1 to 9', (this.players as string[])[0])
        .then(x => parseInt((x as unknown as Message).content))
        .catch(e => { throw e; });

        if (!m || m > 9 || m < 0 || !this.validMove(m)) {
            msg.send('Invalid Move');
            return this.playerMove(msg, player);
        }
        return m - 1;
    }

    private AIMove(): number {
        let m = 4;
        const depth = this.board.filter(s => parseInt(s)).length;
        if (this.difficulty === 3) m = this.minimax(this.board, depth, 0)[0];
        if (this.difficulty === 2) m = this.random(this.board);
        if (this.difficulty === 1) m = this.minimax(this.board, depth, 1)[0];
        return m;
    }

    private random (state: string[]): number {
        const rand = Math.floor(Math.random() * 9);
        if (!this.validMove(rand)) return this.random(state);
        return rand;
    }

    private minimax(state: string[], depth: number, pnum: number): number[] {
        const p = (this.pval as string[])[pnum];
        let best = [-1, Infinity];
        if (p === this.comp) best = [-1, -Infinity];

        if (depth === 0 || this.verifyWin(state, this.comp as string) || this.verifyWin(state, this.player1)) return [-1, this.evaluate(state)];

        for (let i = 0; i < 9; i++) {
            if (state[i] === 'X' || state[i] === 'O') continue;
            state[i] = p;
            let score = this.minimax(state, depth - 1, Math.abs(pnum - 1));
            state[i] = `${i + 1}`;
            score[0] = i;

            if (p === this.comp) {
                if (score[1] > best[1]) best = score;
            } else if (score[1] < best[1]) best = score;
        }
        return best;
    }

    private evaluate(state: string[]) {
        if (this.verifyWin(state, this.comp as string)) return 1;
        else if (this.verifyWin(state, this.player1)) return -1;
        return 0;
    }

    public validMove(m: number) {
        return this.board[m] !== 'X' || this.board[m] !== 'O';
    }

    private emojify(n: number): string {
        if (this.board[n] === 'X') return ':x:';
        else if (this.board[n] === 'O') return ':o:';
        else return `:${this.client.utils.number_string(n + 1)}:`;
    }

    private async prompt(msg: KlasaMessage, prompt: string, user: string) {
        const mess = await msg.channel.send(prompt) as Message;
        const collected = await mess.channel.awaitMessages(m => m.author.id === user, { time: 30000, max: 1});
        await mess.delete();
        if (collected.size === 0) throw 'Timeout! Try again';
        return collected.first();
    }

    private getBoard(board: string[]) {
        return `
${this.emojify(0)} ${this.emojify(1)} ${this.emojify(2)}
${this.emojify(3)} ${this.emojify(4)} ${this.emojify(5)}
${this.emojify(6)} ${this.emojify(7)} ${this.emojify(8)}
`;
    }

    private verifyWin(board: string[], player: string) {
        return (board[0] === board[1] && board[0] === board[2] && board[0] === player)
            || (board[0] === board[3] && board[0] === board[6] && board[0] === player)
            || (board[3] === board[4] && board[3] === board[5] && board[3] === player)
            || (board[1] === board[4] && board[1] === board[7] && board[1] === player)
            || (board[6] === board[7] && board[6] === board[8] && board[6] === player)
            || (board[2] === board[5] && board[2] === board[8] && board[2] === player)
            || (board[0] === board[4] && board[0] === board[8] && board[0] === player)
            || (board[2] === board[4] && board[2] === board[6] && board[2] === player);
    }
}
