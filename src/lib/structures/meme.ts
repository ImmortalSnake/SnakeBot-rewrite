import SnakeBot from '../client';
import fetch from 'node-fetch';
import { TextChannel, MessageEmbed, ClientUser } from 'discord.js';

export default class MemeHandler {

    client: SnakeBot;

    public subreddit = (subreddit: string) => `https://www.reddit.com/r/${subreddit}/top/.json?sort=top&t=day&limit=100`;
    public memeURL = [
        this.subreddit('memes'),
        this.subreddit('dank_meme'),
        this.subreddit('dankmemes'),
        this.subreddit('meirl'),
        'https://www.reddit.com/r/me_irl/top/.json?sort=top&t=day&limit=350',
        this.subreddit('funny'),
        this.subreddit('puns'),
        'https://www.reddit.com/r/surrealmemes/top/.json?sort=top&t=day&limit=350',
        'https://www.reddit.com/user/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=350',
    ];


    constructor(client: SnakeBot) {
        this.client = client;
    }

    public get random () {
        return this.memeURL[Math.floor(Math.random() * this.memeURL.length)];
    }

    public async meme(channel: string) {
        let chan = this.client.channels.get(channel) as TextChannel;
        if (!channel) return;
        return fetch(this.random)
            .then(data => data.json())
            .then(async (meme: any) => {
                if (!meme.data) return;
                const post = meme.data.children
                    .filter((po: any) => po.data.preview)[Math.floor(Math.random() * meme.data.children.length)];

                await chan.send(new MessageEmbed()
                    .setColor('AQUA')
                    .setTitle(post.data.title)
                    .setURL(post.data.url)
                    .setAuthor((this.client.user as ClientUser).tag, (this.client.user as ClientUser).displayAvatarURL())
                    .setImage(post.data.url)
                    .setFooter(`posted by ${post.data.author} | 👍 ${post.data.ups} | 💬 ${post.data.num_comments}`));
            });
    }
}
