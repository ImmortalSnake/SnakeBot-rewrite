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
const klasa_1 = require("klasa");
const node_fetch_1 = __importDefault(require("node-fetch"));
class Connect4 {
    constructor(client, message, players) {
        this.empty = 0;
        this.p1 = 1;
        this.p2 = -1;
        this.solutionURL = (pos) => `https://connect4.gamesolver.org/solve?pos=${pos}`;
        this.board = this.createBoard();
        this.client = client;
        this.player1 = {
            id: players[0],
            val: this.p1,
            name: this.client.users.get(players[0]).username
        };
        this.player2 = {
            id: players[1],
            val: this.p2,
            name: this.client.users.get(players[1]).username
        };
        this.channel = message.channel.id;
        this.author = message.author;
        this.difficulty = 1;
        this.turn = this.player1;
        this.AI = players.includes(client.id);
        this.over = false;
        this.state = '';
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.AI) {
                let difficulty = yield msg.prompt('Select Difficulty\n1 - Easy\n2 - Medium\n3 - Impossible')
                    .then(m => parseInt(m.content))
                    .catch();
                if (!difficulty || difficulty > 3 || difficulty < 1)
                    return msg.channel.send('Invalid Difficulty');
                this.difficulty += Math.pow(difficulty, 2);
            }
            while (!this.over) {
                yield msg.channel.send(this.display(this.board));
                if (this.isClient(this.turn)) {
                    yield this.computerMove(this.board, this.turn);
                    if (this.checkWin(this.board, this.turn.val)) {
                        yield msg.channel.send(this.display(this.board));
                        return msg.channel.send('Sorry, you lost');
                    }
                }
                else {
                    yield this.humanMove(this.board, this.turn, msg);
                    if (this.checkWin(this.board, this.turn.val)) {
                        yield msg.channel.send(this.display(this.board));
                        return msg.channel.send(`<@${this.turn.id}> has won!!`);
                    }
                }
                if (this.isBoardFull(this.board))
                    return msg.channel.send('Its a tie!');
                this.turn = this.turn === this.player1 ? this.player2 : this.player1;
            }
        });
    }
    createBoard(height = 6, width = 7) {
        const board = [];
        for (let i = 0; i < height; i++) {
            board.push([]);
            for (let j = 0; j < width; j++) {
                board[i][j] = this.empty;
            }
        }
        return board;
    }
    display(board) {
        let mess = ':one: :two: :three: :four: :five: :six: :seven:\n';
        for (const i of board) {
            for (const j of i) {
                if (j === this.empty)
                    mess += ':white_large_square: ';
                else if (j === this.p1)
                    mess += ':large_blue_circle: ';
                else
                    mess += ':red_circle: ';
            }
            mess += '\n';
        }
        mess += `:large_blue_circle: - **${this.player1.name}**\n:red_circle: - **${this.player2.name}**`;
        return mess;
    }
    checkWin(board, player) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === player && board[i][j + 1] === player && board[i][j + 2] === player && board[i][j + 3] === player)
                    return true;
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 7; j++) {
                if (board[i][j] === player && board[i + 1][j] === player && board[i + 2][j] === player && board[i + 3][j] === player)
                    return true;
            }
        }
        for (let i = 3; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === player && board[i - 1][j + 1] === player && board[i - 2][j + 2] === player && board[i - 3][j + 3] === player)
                    return true;
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === player && board[i + 1][j + 1] === player && board[i + 2][j + 2] === player && board[i + 3][j + 3] === player)
                    return true;
            }
        }
        return false;
    }
    humanMove(board, player, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let move = yield this.prompt(msg, `Enter a number from 1 to 7 **(${player.name})**`, player.id)
                .then(m => m.content)
                .catch();
            if (!this.isValidMove(board, parseInt(move))) {
                if (move.toLowerCase() === 'cancel') {
                    this.over = true;
                    return null;
                }
                yield msg.channel.send('Invalid Move');
                return this.humanMove(board, player, msg);
            }
            else {
                this.drop(board, player, parseInt(move) - 1);
                this.state += move;
                return parseInt(move);
            }
        });
    }
    computerMove(board, player) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.difficulty === 10) {
                const solution = yield this.fetchSolution();
                const move = solution.score.indexOf(Math.max(...solution.score.filter(score => score < 100)));
                this.state += `${move + 1}`;
                return this.drop(board, player, move);
            }
            let potentialMoves = this.getPotentialMoves(board, player, this.difficulty);
            let bestMoveFitness = -10;
            for (let i = 0; i < 7; i++) {
                if (potentialMoves[i] > bestMoveFitness && this.isValidMove(board, i + 1))
                    bestMoveFitness = potentialMoves[i];
            }
            const bestMoves = [];
            for (let i = 0; i < potentialMoves.length; i++) {
                if (potentialMoves[i] === bestMoveFitness && this.isValidMove(board, i + 1))
                    bestMoves.push(i);
            }
            const move = bestMoves[Math.floor(Math.random() * bestMoves.length)];
            this.state += `${move + 1}`;
            return this.drop(board, player, move);
        });
    }
    getPotentialMoves(board, player, depth) {
        let potentialMoves = [0, 0, 0, 0, 0, 0, 0];
        if (depth === 0 || this.isBoardFull(board))
            return potentialMoves;
        const opponent = player.val === this.p2 ? this.player1 : this.player2;
        const m = player.id === this.client.id ? 1 : -1;
        for (let i = 0; i < 7; i++) {
            if (!this.isValidMove(board, i + 1))
                continue;
            const dupeBoard = klasa_1.util.deepClone(board);
            this.drop(dupeBoard, player, i);
            if (this.checkWin(dupeBoard, player.val)) {
                potentialMoves[i] = 1 * m;
                break;
            }
            else {
                const results = this.getPotentialMoves(dupeBoard, opponent, depth - 1);
                potentialMoves[i] += (results.reduce((a, b) => a + b, 0)) / 7;
            }
        }
        return potentialMoves;
    }
    fetchSolution() {
        return __awaiter(this, void 0, void 0, function* () {
            return node_fetch_1.default(this.solutionURL(this.state)).then(res => res.json());
        });
    }
    drop(board, player, tile) {
        for (let i = 5; i > -1; i--) {
            if (board[i][tile] === this.empty)
                return board[i][tile] = player.val;
        }
    }
    isClient(player) {
        return player.id === this.client.id;
    }
    isBoardFull(board) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (board[i][j] === this.empty)
                    return false;
            }
        }
        return true;
    }
    isValidMove(board, move) {
        if (move && move > 0 && move < 8 && board[0][move - 1] === this.empty)
            return true;
        return false;
    }
    prompt(msg, prompt, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const mess = yield msg.channel.send(prompt);
            const collected = yield mess.channel.awaitMessages(m => m.author.id === user, { time: 60000, max: 1 });
            yield mess.delete();
            if (collected.size === 0)
                throw 'Timeout! Try again';
            return collected.first();
        });
    }
}
exports.default = Connect4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdDQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0dhbWVzL2Nvbm5lY3Q0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxpQ0FBMkM7QUFFM0MsNERBQStCO0FBYS9CLE1BQXFCLFFBQVE7SUFvQnpCLFlBQVksTUFBZ0IsRUFBRSxPQUFxQixFQUFFLE9BQWlCO1FBbkJ0RCxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsT0FBRSxHQUFHLENBQUMsQ0FBQztRQUNQLE9BQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUdSLGdCQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLDZDQUE2QyxHQUFHLEVBQUUsQ0FBQztRQWU5RixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWixJQUFJLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBVSxDQUFDLFFBQVE7U0FDN0QsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNaLElBQUksRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFVLENBQUMsUUFBUTtTQUM3RCxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENB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