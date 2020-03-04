import { CommandStore, KlasaMessage, util } from 'klasa';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import Util from '../../lib/utils/Util';
import { MessageAttachment } from 'discord.js';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['execute'],
            hidden: true,
            guarded: true,
            permissionLevel: 10,
            requiredPermissions: ['ATTACH_FILES'],
            usage: '<expression:...str>',
            examples: ['node -v']
        });
    }

    public async run(msg: KlasaMessage, [expression]: [string]) {
        const timeout = Number(msg.flagArgs.timeout) || 60000;
        const result = await util.exec(expression, { timeout })
            .catch(err => ({ stdout: null, stderr: err }));

        const output = result.stdout ? `**\`OUTPUT\`**${util.codeBlock('prolog', result.stdout)}` : '';
        const outerr = result.stderr ? `**\`ERROR\`**${util.codeBlock('prolog', result.stderr)}` : '';
        const content = [output, outerr].join('\n') || 'No output';

        if (content.length < 2000) return msg.sendMessage([output, outerr].join('\n'));

        let sendAs = msg.flagArgs.sendAs || msg.flagArgs.output;
        const options = ['haste', 'log', 'file'];
        if (!sendAs) sendAs = await msg.prompt(`Choose one of the following options: ${options.join(', ')}`).then(m => m.content).catch(() => 'none');

        switch (sendAs.toLowerCase()) {
            case 'haste':
                return msg.send(await Util.getHaste(content, 'prolog'));
            case 'file':
                return msg.send(new MessageAttachment(Buffer.from(content), 'output.txt'));
            default:
                console.log(content);
                return null;
        }
    }

}
