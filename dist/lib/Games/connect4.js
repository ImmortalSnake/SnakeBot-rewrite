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
        this.player1 = { id: players[0], val: this.p1 };
        this.player2 = { id: players[1], val: this.p2 };
        this.channel = message.channel.id;
        this.author = message.author;
        this.difficulty = 3;
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
                this.difficulty += difficulty;
            }
            while (!this.over) {
                yield msg.channel.send(this.display(this.board));
                if (this.isClient(this.turn)) {
                    yield this.computerMove(this.board, this.turn);
                    if (this.checkWin(this.board, this.turn.val))
                        return msg.channel.send('Sorry, you lost');
                }
                else {
                    yield this.humanMove(this.board, this.turn, msg);
                    if (this.checkWin(this.board, this.turn.val))
                        return msg.channel.send(`<@${this.turn.id}> has won!!`);
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
            let move = yield this.prompt(msg, 'Enter a number from 1 to 7', player.id)
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
            if (this.difficulty === 6) {
                const solution = yield this.fetchSolution();
                console.log(solution);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdDQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0dhbWVzL2Nvbm5lY3Q0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxpQ0FBMkM7QUFFM0MsNERBQStCO0FBWS9CLE1BQXFCLFFBQVE7SUFrQnpCLFlBQVksTUFBZ0IsRUFBRSxPQUFxQixFQUFFLE9BQWlCO1FBakJ0RCxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsT0FBRSxHQUFHLENBQUMsQ0FBQztRQUNQLE9BQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNSLGdCQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLDZDQUE2QyxHQUFHLEVBQUUsQ0FBQztRQWU5RixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFD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