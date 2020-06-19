import { KlasaMessage, KlasaClient } from 'klasa';
import Util from '../utils/Util';

interface Player {
    id: string;
    val: string;
    name: string;
}

export default class TicTacToe {

    public message: KlasaMessage;
    public client: KlasaClient;
    public AI: boolean;

    public player1: Player;
    public player2: Player;
    public turn: Player;
    public players: [Player, Player];

    public over = false;
    public difficulty = 0;
    public board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    public dict = {
        X: ':x:',
        O: ':o:'
    };

    public constructor(message: KlasaMessage, players: string[]) {

        this.message = message;
        this.client = message.client as KlasaClient;
        this.AI = players.includes(this.client.user!.id);

        this.player1 = {
            id: players[0],
            val: 'X',
            name: this.client.users.cache.get(players[0])!.username
        };

        this.player2 = {
            id: players[1],
            val: 'O',
            name: this.client.users.cache.get(players[1])!.username
        };

        this.players = [this.player1, this.player2];
        this.turn = this.player1;

    }

    public get isBoardFull() {
        return this.board.filter(x => Number(x)).length === 0;
    }

    public validMove(m: number): boolean {
        return this.board[m] !== 'X' && this.board[m] !== 'O';
    }

    public isClient(player: Player) {
        return player.id === this.client.user!.id;
    }

    public async run() {
        if (this.AI) {
            const difficulty = await this.message.prompt(this.message.language.get('GAME_DIFFICULTY'))
                .then(mess => parseInt(mess.content, 10))
                .catch();

            if (!difficulty || difficulty > 3 || difficulty < 1) throw this.message.language.get('GAME_INVALID_DIFFICULTY');
            this.difficulty = difficulty;
        }

        while (!this.over) {
            if (this.isClient(this.turn)) {
                const m = this.computerMove();
                this.board[m] = this.turn.val;

                if (this.checkWin(this.board, this.turn.val)) return this.message.channel.send(`${this.displayBoard}Sorry, you lost`);
            } else {
                // send board
                const m = await this.humanMove(this.turn);

                this.board[m] = this.turn.val;
                if (this.checkWin(this.board, this.turn.val)) return this.message.channel.send(`${this.displayBoard}<@${this.turn.id}> has won!!`);
            }

            if (this.isBoardFull) return this.message.channel.send('Its a tie!');
            this.turn = this.turn.val === this.player1.val ? this.player2 : this.player1;
        }
    }

    private async humanMove(player: Player): Promise<number> {
        const m = await this.message.prompt(`${this.displayBoard}**${player.name}:** Enter A Number From 1 to 9`, { user: player.id })
            .then(mess => parseInt(mess.content, 10))
            .catch(e => { throw e; });

        if (!m || m > 9 || m < 1 || !this.validMove(m)) {
            await this.message.send('Invalid Move');
            return this.humanMove(player);
        }

        return m - 1;
    }

    private computerMove(): number {
        let m = 4;
        const depth = this.board.filter(s => parseInt(s, 10)).length;
        if (this.difficulty === 3) [m] = this.minimax(this.board, depth, 1);
        if (this.difficulty === 2) m = this.random(this.board);
        if (this.difficulty === 1) [m] = this.minimax(this.board, depth, 0);
        return m;
    }

    private random(state: string[]): number {
        const board = [...state.entries()].filter(([, x]) => Number(x));
        const rand = Math.floor(Math.random() * board.length);

        return board[rand][0];
    }

    private minimax(state: string[], depth: number, pnum: number): number[] {
        const p = this.players[pnum];
        let best = [-1, Infinity];

        const client = this.isClient(p) ? p : this.players[Math.abs(pnum - 1)];
        const opp = client.val === p.val ? this.players[Math.abs(pnum - 1)] : p;

        if (p.val === client.val) best = [-1, -Infinity];
        if (depth === 0 || this.checkWin(state, client.val) || this.checkWin(state, opp.val)) return [-1, this.evaluate(state)];

        for (let i = 0; i < 9; i++) {
            if (state[i] === 'X' || state[i] === 'O') continue;
            state[i] = p.val;
            const score = this.minimax(state, depth - 1, Math.abs(pnum - 1));
            state[i] = `${i + 1}`;
            score[0] = i;

            if (this.isClient(p)) {
                if (score[1] > best[1]) best = score;
            } else if (score[1] < best[1]) {
                best = score;
            }
        }

        return best;
    }

    private evaluate(state: string[]): number {
        const isClient = this.isClient(this.player1);
        if (this.checkWin(state, this.player1.val)) return isClient ? 1 : -1;
        else if (this.checkWin(state, this.player2.val)) return isClient ? -1 : 1;
        return 0;
    }

    private emojify(n: number): string {
        if (this.board[n] === 'X') return ':x:';
        else if (this.board[n] === 'O') return ':o:';
        return `:${Util.number_string[n + 1]}:`;
    }

    private get displayBoard(): string {
        return `${this.emojify(0)} ${this.emojify(1)} ${this.emojify(2)}
${this.emojify(3)} ${this.emojify(4)} ${this.emojify(5)}
${this.emojify(6)} ${this.emojify(7)} ${this.emojify(8)}
`;
    }

    private checkWin(board: string[], player: string): boolean {
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
