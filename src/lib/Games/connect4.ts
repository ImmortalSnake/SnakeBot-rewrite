import SnakeBot from '../client';
import { KlasaMessage, util } from 'klasa';
import { User } from 'discord.js';
import fetch from 'node-fetch';

interface Player {
    id: string;
    val: number;
    name: string;
}

interface Solution {
    pos: string;
    score: number[];
}

export default class Connect4 {

    public board: number[][];
    public client: SnakeBot;
    public player1: Player;
    public player2: Player;
    public channel: string;
    public author: User;
    public difficulty: number;
    public turn: Player;
    public AI: boolean;
    public over: boolean;
    public state: string;

    public readonly empty = 0;
    public readonly p1 = 1;
    public readonly p2 = -1;
    public readonly message: KlasaMessage;

    public constructor(message: KlasaMessage, players: string[]) {
        this.board = this.createBoard();
        this.client = message.client as SnakeBot;
        this.player1 = {
            id: players[0],
            val: this.p1,
            name: this.client.users.get(players[0])!.username
        };

        this.player2 = {
            id: players[1],
            val: this.p2,
            name: this.client.users.get(players[1])!.username
        };

        this.message = message;
        this.channel = message.channel.id;
        this.author = message.author as User;
        this.difficulty = 1; // can be 1, 5, 10
        this.turn = this.player1;
        this.AI = players.includes(this.client.user!.id);
        this.over = false;
        this.state = '';
    }

    // Impossible AI
    public readonly solutionURL = (pos: string) => `https://connect4.gamesolver.org/solve?pos=${pos}`;

    public async run() {
        if (this.AI) {
            const difficulty = await this.message.prompt(this.message.language.get('GAME_DIFFICULTY'))
                .then(mess => parseInt(mess.content, 10))
                .catch();

            if (!difficulty || difficulty > 3 || difficulty < 1) throw this.message.language.get('GAME_INVALID_DIFFICULTY');
            this.difficulty += difficulty ** 2;
        }

        while (!this.over) {
            if (this.isClient(this.turn)) {
                await this.computerMove(this.board, this.turn);
                if (this.checkWin(this.board, this.turn.val)) {
                    return this.message.channel.send(`${this.display(this.board)}\nSorry, you lost`);
                }
            } else {
                await this.message.channel.send(this.display(this.board));
                await this.humanMove(this.board, this.turn);
                if (this.checkWin(this.board, this.turn.val)) {
                    return this.message.channel.send(`${this.display(this.board)}\n<@${this.turn.id}> has won!!`);
                }
            }

            if (this.isBoardFull(this.board)) return this.message.channel.send('Its a tie!');
            this.turn = this.turn === this.player1 ? this.player2 : this.player1;
        }
    }

    public createBoard(height = 6, width = 7): number[][] {
        const board = [] as any[];
        for (let i = 0; i < height; i++) {
            board.push([]);
            for (let j = 0; j < width; j++) {
                board[i][j] = this.empty;
            }
        }

        return board;
    }

    public display(board: number[][]): string {
        let mess = ':one: :two: :three: :four: :five: :six: :seven:\n';
        for (const i of board) {
            for (const j of i) {
                if (j === this.empty) mess += ':white_large_square: ';
                else if (j === this.p1) mess += ':blue_circle: ';
                else mess += ':red_circle: ';
            }
            mess += '\n';
        }

        mess += `:blue_circle: - **${this.player1.name}**\n:red_circle: - **${this.player2.name}**`;
        return mess;
    }

    public checkWin(board: number[][], player: number): boolean {
        // Horizontal
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === player && board[i][j + 1] === player && board[i][j + 2] === player && board[i][j + 3] === player) return true;
            }
        }

        // Vertical
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 7; j++) {
                if (board[i][j] === player && board[i + 1][j] === player && board[i + 2][j] === player && board[i + 3][j] === player) return true;
            }
        }

        // Diagonal 1
        for (let i = 3; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === player && board[i - 1][j + 1] === player && board[i - 2][j + 2] === player && board[i - 3][j + 3] === player) return true;
            }
        }

        // Diagonal 2
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === player && board[i + 1][j + 1] === player && board[i + 2][j + 2] === player && board[i + 3][j + 3] === player) return true;
            }
        }

        return false;
    }

    public async humanMove(board: number[][], player: Player): Promise<number | null> {
        const move = await this.message.prompt(`Enter a number from 1 to 7 **(${player.name})**`, { user: player.id })
            .then(m => m.content)
            .catch();

        if (!this.isValidMove(board, parseInt(move, 10))) {
            if (move.toLowerCase() === 'cancel') {
                this.over = true;
                return null;
            }
            await this.message.channel.send('Invalid Move');
            return this.humanMove(board, player);
        }

        this.drop(board, player, parseInt(move, 10) - 1);
        this.state += move;
        return parseInt(move, 10);
    }

    public async computerMove(board: number[][], player: Player) {
        if (this.difficulty === 10) {
            const solution = await this.fetchSolution();
            const move = solution.score.indexOf(Math.max(...solution.score.filter(score => score < 100)));
            this.state += `${move + 1}`;
            return this.drop(board, player, move);
        }

        const potentialMoves = this.getPotentialMoves(board, player, this.difficulty);
        let bestMoveFitness = -10;

        for (let i = 0; i < 7; i++) {
            if (potentialMoves[i] > bestMoveFitness && this.isValidMove(board, i + 1)) bestMoveFitness = potentialMoves[i];
        }

        const bestMoves = [];
        for (let i = 0; i < potentialMoves.length; i++) {
            if (potentialMoves[i] === bestMoveFitness && this.isValidMove(board, i + 1)) bestMoves.push(i);
        }
        const move = bestMoves[Math.floor(Math.random() * bestMoves.length)];
        this.state += `${move + 1}`;
        return this.drop(board, player, move);
    }

    private getPotentialMoves(board: number[][], player: Player, depth: number): number[] {
        const potentialMoves = [0, 0, 0, 0, 0, 0, 0];

        if (depth === 0 || this.isBoardFull(board)) return potentialMoves;

        const opponent = player.val === this.p2 ? this.player1 : this.player2;
        const m = this.isClient(player) ? 1 : -1;

        for (let i = 0; i < 7; i++) {
            if (!this.isValidMove(board, i + 1)) continue;

            const dupeBoard = util.deepClone(board);
            this.drop(dupeBoard, player, i);

            if (this.checkWin(dupeBoard, player.val)) {
                potentialMoves[i] = m;
                break;
            } else {
                const results = this.getPotentialMoves(dupeBoard, opponent, depth - 1);
                potentialMoves[i] += (results.reduce((a, b) => a + b, 0)) / 7;
            }
        }

        return potentialMoves;
    }

    private async fetchSolution(): Promise<Solution> {
        return fetch(this.solutionURL(this.state)).then(res => res.json());
    }

    private drop(board: number[][], player: Player, tile: number) {
        for (let i = 5; i > -1; i--) {
            if (board[i][tile] === this.empty) return board[i][tile] = player.val;
        }
    }

    private isClient(player: Player): boolean {
        return player.id === this.client.user!.id;
    }

    private isBoardFull(board: number[][]): boolean {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (board[i][j] === this.empty) return false;
            }
        }

        return true;
    }

    private isValidMove(board: number[][], move: boolean | number): boolean {
        if (move && move > 0 && move < 8 && board[0][(move as number) - 1] === this.empty) return true;
        return false;
    }

}
