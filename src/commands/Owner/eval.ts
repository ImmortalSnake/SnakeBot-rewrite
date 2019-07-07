import { Command, CommandStore, Stopwatch, Type, util, KlasaClient, KlasaMessage } from 'klasa';
import { inspect } from 'util';
import fetch from 'node-fetch';

interface IEvalResult {
  success: boolean;
  result: Error | string;
  time: string;
  type: string | Type;
}

interface IHandleMessageOptions {
    success: boolean;
    result: any;
    time: string;
    footer: string;
    language: string;
}

export default class extends Command {

    private timeout = 3000;

    constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
        super(client, store, file, dir, {
            aliases: ['ev'],
            description: (language) => language.get('COMMAND_EVAL_DESCRIPTION'),
            extendedHelp: (language) => language.get('COMMAND_EVAL_EXTENDED'),
            guarded: true,
            permissionLevel: 10,
            usage: '<expression:str>'
        });
    }

    async run(msg: KlasaMessage, [code]: [string]) {
        const flagTime = 'no-timeout' in msg.flags ? 'wait' in msg.flags ? Number(msg.flags.wait) : this.timeout : Infinity;
        const language = msg.flags.lang || msg.flags.language || (msg.flags.json ? 'json' : 'js');
        const { success, result, time, type } = await this.timedEval(msg, code, flagTime);

        if (msg.flags.silent) {
            if (!success && result && (result as Error).stack) this.client.emit('error', (result as Error).stack);
            return null;
        }

        const footer = util.codeBlock('ts', type);
        const sendAs = msg.flags.output || msg.flags['output-to'] || (msg.flags.log ? 'log' : null);
        return this.handleMessage(msg, { sendAs, hastebinUnavailable: false, url: null }, { success, result, time, footer, language });
    }


    async handleMessage(msg: KlasaMessage, options: any, { success, result, time, footer, language }: IHandleMessageOptions): Promise<KlasaMessage | KlasaMessage[] | null> {
        switch (options.sendAs) {
            case 'file': {
                if (msg.channel.attachable) return msg.channel.sendFile(Buffer.from(result), 'output.txt', msg.language.get('COMMAND_EVAL_OUTPUT_FILE', time, footer));
                await this.getTypeOutput(msg, options);
                return this.handleMessage(msg, options, { success, result, time, footer, language });
            }
            case 'haste':
            case 'hastebin': {
                if (!options.url) options.url = await this.getHaste(result, language).catch(() => null);
                if (options.url) return msg.sendMessage(msg.language.get('COMMAND_EVAL_OUTPUT_HASTEBIN', time, options.url, footer));
                options.hastebinUnavailable = true;
                await this.getTypeOutput(msg, options);
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
                    await this.getTypeOutput(msg, options);
                    return this.handleMessage(msg, options, { success, result, time, footer, language });
                }
                return msg.sendMessage(msg.language.get(success ? 'COMMAND_EVAL_OUTPUT' : 'COMMAND_EVAL_ERROR',
                    time, util.codeBlock(language, result), footer));
            }
        }
    }

    async getTypeOutput(msg: KlasaMessage, options: { hastebinUnavailable: boolean, sendAs: string }) {
        const _options = ['log'];
        if (msg.channel.attachable) _options.push('file');
        if (!options.hastebinUnavailable) _options.push('hastebin');
        let _choice;
        do {
            _choice = await msg.prompt(`Choose one of the following options: ${_options.join(', ')}`).catch(() => ({ content: 'none' }));
        } while (!['file', 'haste', 'hastebin', 'console', 'log', 'default', 'none', null].includes(_choice.content));
        options.sendAs = _choice.content;
    }

    timedEval(msg: KlasaMessage, code: string, flagTime: number) {
        if (flagTime === Infinity || flagTime === 0) return this.eval(msg, code);
        return Promise.race([
            util.sleep(flagTime).then(() => ({
                success: false,
                result: msg.language.get('COMMAND_EVAL_TIMEOUT', flagTime / 1000),
                time: '⏱ ...',
                type: 'EvalTimeoutError'
            })),
            this.eval(msg, code)
        ]);
    }

    // Eval the input
    async eval(msg: KlasaMessage, code: string): Promise<IEvalResult> {
        const stopwatch = new Stopwatch();
        let success, syncTime, asyncTime, result;
        let thenable = false;
        let type;
        try {
            if (msg.flags.async) code = `(async () => {\n${code}\n})();`;
// tslint:disable-next-line: no-eval
            result = eval(code);
            syncTime = stopwatch.toString();
            type = new Type(result);
            if (util.isThenable(result)) {
                thenable = true;
                stopwatch.restart();
                result = await result;
                asyncTime = stopwatch.toString();
            }
            success = true;
        } catch (error) {
            if (!syncTime) syncTime = stopwatch.toString();
            if (thenable && !asyncTime) asyncTime = stopwatch.toString();
            if (!type) type = new Type(error);
            result = error;
            success = false;
        }

        stopwatch.stop();
        if (typeof result !== 'string') {
            result = result instanceof Error ? result.stack : msg.flags.json ? JSON.stringify(result, null, 4) : inspect(result, {
                depth: msg.flags.depth ? parseInt(msg.flags.depth) || 0 : 0,
                showHidden: Boolean(msg.flags.showHidden)
            });
        }
        return { success, type, time: this.formatTime(syncTime, asyncTime), result: util.clean(result!) };
    }

    formatTime(syncTime: string, asyncTime?: string) {
        return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
    }

    async getHaste(evalResult: string, language: string) {
        const key = await fetch('https://hastebin.com/documents', { method: 'POST', body: evalResult })
            .then((response: any) => response.json())
            .then((body: any) => body.key);
        return `https://hastebin.com/${key}.${language}`;
    }

}
