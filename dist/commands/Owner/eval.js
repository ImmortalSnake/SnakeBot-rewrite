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
const util_1 = require("util");
const node_fetch_1 = __importDefault(require("node-fetch"));
class default_1 extends klasa_1.Command {
    constructor(client, store, file, dir) {
        super(client, store, file, dir, {
            aliases: ['ev'],
            description: (language) => language.get('COMMAND_EVAL_DESCRIPTION'),
            extendedHelp: (language) => language.get('COMMAND_EVAL_EXTENDED'),
            guarded: true,
            permissionLevel: 10,
            usage: '<expression:...str>'
        });
        this.timeout = 3000;
    }
    run(msg, [code]) {
        return __awaiter(this, void 0, void 0, function* () {
            const flagTime = 'no-timeout' in msg.flags ? 'wait' in msg.flags ? Number(msg.flags.wait) : this.timeout : Infinity;
            const language = msg.flags.lang || msg.flags.language || (msg.flags.json ? 'json' : 'js');
            const { success, result, time, type } = yield this.timedEval(msg, code, flagTime);
            if (msg.flags.silent) {
                if (!success && result && result.stack)
                    this.client.emit('error', result.stack);
                return null;
            }
            const footer = klasa_1.util.codeBlock('ts', type);
            const sendAs = msg.flags.output || msg.flags['output-to'] || (msg.flags.log ? 'log' : null);
            return this.handleMessage(msg, { sendAs, hastebinUnavailable: false, url: null }, { success, result, time, footer, language });
        });
    }
    handleMessage(msg, options, { success, result, time, footer, language }) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (options.sendAs) {
                case 'file': {
                    if (msg.channel.attachable)
                        return msg.channel.sendFile(Buffer.from(result), 'output.txt', msg.language.get('COMMAND_EVAL_OUTPUT_FILE', time, footer));
                    yield this.getTypeOutput(msg, options);
                    return this.handleMessage(msg, options, { success, result, time, footer, language });
                }
                case 'haste':
                case 'hastebin': {
                    if (!options.url)
                        options.url = yield this.getHaste(result, language).catch(() => null);
                    if (options.url)
                        return msg.sendMessage(msg.language.get('COMMAND_EVAL_OUTPUT_HASTEBIN', time, options.url, footer));
                    options.hastebinUnavailable = true;
                    yield this.getTypeOutput(msg, options);
                    return this.handleMessage(msg, options, { success, result, time, footer, language });
                }
                case 'console':
                case 'log': {
                    this.client.emit('log', result);
                    return msg.sendMessage(msg.language.get('COMMAND_EVAL_OUTPUT_CONSOLE', time, footer));
                }
                case 'none':
                    return null;
                default: {
                    if (result.length > 2000) {
                        yield this.getTypeOutput(msg, options);
                        return this.handleMessage(msg, options, { success, result, time, footer, language });
                    }
                    return msg.sendMessage(msg.language.get(success ? 'COMMAND_EVAL_OUTPUT' : 'COMMAND_EVAL_ERROR', time, klasa_1.util.codeBlock(language, result), footer));
                }
            }
        });
    }
    getTypeOutput(msg, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _options = ['log'];
            if (msg.channel.attachable)
                _options.push('file');
            if (!options.hastebinUnavailable)
                _options.push('hastebin');
            let _choice;
            do {
                _choice = yield msg.prompt(`Choose one of the following options: ${_options.join(', ')}`).catch(() => ({ content: 'none' }));
            } while (!['file', 'haste', 'hastebin', 'console', 'log', 'default', 'none', null].includes(_choice.content));
            options.sendAs = _choice.content;
        });
    }
    timedEval(msg, code, flagTime) {
        if (flagTime === Infinity || flagTime === 0)
            return this.eval(msg, code);
        return Promise.race([
            klasa_1.util.sleep(flagTime).then(() => ({
                success: false,
                result: msg.language.get('COMMAND_EVAL_TIMEOUT', flagTime / 1000),
                time: '⏱ ...',
                type: 'EvalTimeoutError'
            })),
            this.eval(msg, code)
        ]);
    }
    eval(msg, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const stopwatch = new klasa_1.Stopwatch();
            let success, syncTime, asyncTime, result;
            let thenable = false;
            let type;
            try {
                if (msg.flags.async)
                    code = `(async () => {\n${code}\n})();`;
                result = eval(code);
                syncTime = stopwatch.toString();
                type = new klasa_1.Type(result);
                if (klasa_1.util.isThenable(result)) {
                    thenable = true;
                    stopwatch.restart();
                    result = yield result;
                    asyncTime = stopwatch.toString();
                }
                success = true;
            }
            catch (error) {
                if (!syncTime)
                    syncTime = stopwatch.toString();
                if (thenable && !asyncTime)
                    asyncTime = stopwatch.toString();
                if (!type)
                    type = new klasa_1.Type(error);
                result = error;
                success = false;
            }
            stopwatch.stop();
            if (typeof result !== 'string') {
                result = result instanceof Error ? result.stack : msg.flags.json ? JSON.stringify(result, null, 4) : util_1.inspect(result, {
                    depth: msg.flags.depth ? parseInt(msg.flags.depth) || 0 : 0,
                    showHidden: Boolean(msg.flags.showHidden)
                });
            }
            return { success, type, time: this.formatTime(syncTime, asyncTime), result: klasa_1.util.clean(result) };
        });
    }
    formatTime(syncTime, asyncTime) {
        return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
    }
    getHaste(evalResult, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = yield node_fetch_1.default('https://hastebin.com/documents', { method: 'POST', body: evalResult })
                .then((response) => response.json())
                .then((body) => body.key);
            return `https://hastebin.com/${key}.${language}`;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9Pd25lci9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0c7QUFDaEcsK0JBQStCO0FBQy9CLDREQUErQjtBQWlCL0IsZUFBcUIsU0FBUSxlQUFPO0lBSWhDLFlBQVksTUFBbUIsRUFBRSxLQUFtQixFQUFFLElBQWMsRUFBRSxHQUFXO1FBQzdFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDNUIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2YsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO1lBQ25FLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNqRSxPQUFPLEVBQUUsSUFBSTtZQUNiLGVBQWUsRUFBRSxFQUFFO1lBQ25CLEtBQUssRUFBRSxxQkFBcUI7U0FDL0IsQ0FBQyxDQUFDO1FBVkMsWUFBTyxHQUFHLElBQUksQ0FBQztJQVd2QixDQUFDO0lBRUssR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQVc7O1lBQ3pDLE1BQU0sUUFBUSxHQUFHLFlBQVksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNwSCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFFB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