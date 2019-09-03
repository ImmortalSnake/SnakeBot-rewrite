import SnakeBot from '../client';
import { KlasaMessage, util } from 'klasa';
import { User, Message } from 'discord.js';
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
    public readonly empty = 0;
    public readonly p1 = 1;
    public readonly p2 = -1;

    // Impossible AI
    public readonly solutionURL = (pos: string) => `https://connect4.gamesolver.org/solve?pos=${pos}`;

    board: number[][];
    client: SnakeBot;
    player1: Player;
    player2: Player;
    channel: string;
    author: User;
    difficulty: number;
    turn: Player;
    AI: boolean;
    over: boolean;
    state: string;

    constructor(client: SnakeBot, message: KlasaMessage, players: string[]) {
        this.board = this.createBoard();
        this.client = client;
        this.player1 = {
            id: players[0],
            val: this.p1,
            name: (this.client.users.get(players[0]) as User).username
        };

        this.player2 = {
            id: players[1],
            val: this.p2,
            name: (this.client.users.get(players[1]) as User).username
        };

        this.channel = message.channel.id;
        this.author = message.author as User;
        this.difficulty = 1; // can be 1, 5, 10
        this.turn = this.player1;
        this.AI = players.includes(client.id);
        this.over = false;
        this.state = '';
    }

    public async run(msg: KlasaMessage) {
        if (this.AI) {
            let difficulty = await msg.prompt('Select Difficulty\n1 - Easy\n2 - Medium\n3 - Impossible')
            .then(m => parseInt(m.content))
            .catch();

            if (!difficulty || difficulty > 3 || difficulty < 1) return msg.channel.send('Invalid Difficulty');
            this.difficulty += difficulty ** 2;
        }

        while (!this.over) {
            await msg.channel.send(this.display(this.board));
            if (this.isClient(this.turn)) {
                await this.computerMove(this.board, this.turn);
                if (this.checkWin(this.board, this.turn.val)) {
                    await msg.channel.send(this.display(this.board));
                    return msg.channel.send('Sorry, you lost');
                }
            } else {
                await this.humanMove(this.board, this.turn, msg);
                if (this.checkWin(this.board, this.turn.val)) {
                    await msg.channel.send(this.display(this.board));
                    return msg.channel.send(`<@${this.turn.id}> has won!!`);
                }
            }

            if (this.isBoardFull(this.board)) return msg.channel.send('Its a tie!');
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
                else if (j === this.p1) mess += ':large_blue_circle: ';
                else mess += ':red_circle: ';
            }
            mess += '\n';
        }

        mess += `:large_blue_circle: - **${this.player1.name}**\n:red_circle: - **${this.player2.name}**`;
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

    public async humanMove(board: number[][], player: Player, msg: KlasaMessage): Promise<number | null> {
        let move = await this.prompt(msg, `Enter a number from 1 to 7 **(${player.name})**`, player.id)
        .then(m => m.content)
        .catch();

        if (!this.isValidMove(board, parseInt(move))) {
            if (move.toLowerCase() === 'cancel') {
                this.over = true;
                return null;
            }
            await msg.channel.send('Invalid Move');
            return this.humanMove(board, player, msg);
        } else {
            this.drop(board, player, parseInt(move) - 1);
            this.state += move;
            return parseInt(move);
        }
    }

    public async computerMove(board: number[][], player: Player) {
        if (this.difficulty === 10) {
            const solution = await this.fetchSolution();
            const move = solution.score.indexOf(Math.max(...solution.score.filter(score => score < 100)));
            this.state += `${move + 1}`;
            return this.drop(board, player, move);
        }

        let potentialMoves = this.getPotentialMoves(board, player, this.difficulty);
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
        let potentialMoves = [0, 0, 0, 0, 0, 0, 0];

        if (depth === 0 || this.isBoardFull(board)) return potentialMoves;

        const opponent = player.val === this.p2 ? this.player1 : this.player2;
        const m = player.id === this.client.id ? 1 : -1;

        for (let i = 0; i < 7; i++) {
            if (!this.isValidMove(board, i + 1)) continue;

            const dupeBoard = util.deepClone(board);
            this.drop(dupeBoard, player, i);

            if (this.checkWin(dupeBoard, player.val)) {
                potentialMoves[i] = 1 * m;
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
        return player.id === this.client.id;
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

    private async prompt(msg: KlasaMessage, prompt: string, user: string): Promise<Message> {
        const mess = await msg.channel.send(prompt) as Message;
        const collected = await mess.channel.awaitMessages(m => m.author.id === user, { time: 60000, max: 1});
        await mess.delete();
        if (collected.size === 0) throw 'Timeout! Try again';
        return collected.first() as Message;
    }
}
