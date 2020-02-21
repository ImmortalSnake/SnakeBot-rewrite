import { KlasaMessage } from 'klasa';
import SnakeBot from '../client';
import Util from '../utils/Util';

export default class TicTacToe {

    public client: SnakeBot;
    public AI: boolean;
    public comp?: string;
    public player1: string;
    public player2?: string;
    public first: string;
    public difficulty: number;
    public pval?: string[];
    public players?: string[];

    public board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    public dict = {
        X: ':x:',
        O: ':o:'
    };

    public constructor(client: SnakeBot, AI: boolean) {

        this.client = client;
        this.AI = AI;
        this.player1 = 'O';
        this.comp = AI ? 'X' : undefined;
        this.player2 = AI ? undefined : 'X';
        this.pval = this.comp ? [this.comp, this.player1] : undefined;
        this.first = this.player1;
        this.difficulty = 0;
        this.players = [];

    }

    public async play(msg: KlasaMessage, players: string[]) {
        this.players = players;
        if (this.AI) {
            const difficulty = await msg.prompt(msg.language.get('COMMAND_TICTACTOE_DIFFICULTY'))
                .then(r => parseInt(r.content, 10))
                .catch();

            if (!difficulty || difficulty > 3 || difficulty < 1) throw msg.language.get('COMMAND_TICTACTOE_INVALID_DIFFICULTY');
            this.difficulty = difficulty;
        }
        const res = await this.move(msg).catch(e => e);
        return res;
    }

    public validMove(m: number): boolean {
        return this.board[m] !== 'X' || this.board[m] !== 'O';
    }

    private async move(msg: KlasaMessage): Promise<string> {
        if (this.first !== this.comp) await msg.channel.send(this.getBoard);

        if (this.verifyWin(this.board, 'X')) return 'X has won';
        else if (this.verifyWin(this.board, 'O')) return 'O has won';
        else if (this.board.filter(s => parseInt(s, 10)).length === 0) return 'Its A Tie';

        let m;
        if (this.AI && this.comp === this.first) m = this.AIMove();
        else m = await this.playerMove(msg, this.first).catch();
        this.board[m] = this.first;
        if (this.first === 'O') this.first = 'X';
        else this.first = 'O';

        if (this.players) this.players.reverse();
        return this.move(msg);
    }

    private async playerMove(msg: KlasaMessage, player: string): Promise<number> {
        const m = await msg.prompt('Enter A Number From 1 to 9', { user: this.players![0] })
            .then(mess => parseInt(mess.content, 10))
            .catch(e => { throw e; });

        if (!m || m > 9 || m < 1 || !this.validMove(m)) {
            await msg.send('Invalid Move');
            return this.playerMove(msg, player);
        }

        return m - 1;
    }

    private AIMove(): number {
        let m = 4;
        const depth = this.board.filter(s => parseInt(s, 10)).length;
        if (this.difficulty === 3) [m] = this.minimax(this.board, depth, 0);
        if (this.difficulty === 2) m = this.random(this.board);
        if (this.difficulty === 1) [m] = this.minimax(this.board, depth, 1);
        return m;
    }

    private random(state: string[]): number {
        const rand = Math.floor(Math.random() * 9);
        if (!this.validMove(rand)) return this.random(state);
        return rand;
    }

    private minimax(state: string[], depth: number, pnum: number): number[] {
        const p = this.pval![pnum];
        let best = [-1, Infinity];
        if (p === this.comp) best = [-1, -Infinity];

        if (depth === 0 || this.verifyWin(state, this.comp!) || this.verifyWin(state, this.player1)) return [-1, this.evaluate(state)];

        for (let i = 0; i < 9; i++) {
            if (state[i] === 'X' || state[i] === 'O') continue;
            state[i] = p;
            const score = this.minimax(state, depth - 1, Math.abs(pnum - 1));
            state[i] = `${i + 1}`;
            score[0] = i;

            if (p === this.comp) {
                if (score[1] > best[1]) best = score;
            } else if (score[1] < best[1]) {
                best = score;
            }
        }
        return best;
    }

    private evaluate(state: string[]): number {
        if (this.verifyWin(state, this.comp as string)) return 1;
        else if (this.verifyWin(state, this.player1)) return -1;
        return 0;
    }

    private emojify(n: number): string {
        if (this.board[n] === 'X') return ':x:';
        else if (this.board[n] === 'O') return ':o:';
        return `:${Util.number_string[n]}:`;
    }

    private get getBoard(): string {
        return `
${this.emojify(0)} ${this.emojify(1)} ${this.emojify(2)}
${this.emojify(3)} ${this.emojify(4)} ${this.emojify(5)}
${this.emojify(6)} ${this.emojify(7)} ${this.emojify(8)}
`;
    }

    private verifyWin(board: string[], player: string): boolean {
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
