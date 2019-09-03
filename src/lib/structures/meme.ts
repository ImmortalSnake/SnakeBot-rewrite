import SnakeBot from '../client';
import fetch from 'node-fetch';
import { TextChannel, MessageEmbed, ClientUser } from 'discord.js';

export default class MemeHandler {

    client: SnakeBot;

    public subreddit = (subreddit: string) => `https://www.reddit.com/r/${subreddit}/top/.json?sort=hot&t=day&limit=100`;
    public dogURL = 'https://www.reddit.com/r/dogs/top/.json?sort=new&t=day&limit=100';
    public catURL = 'https://www.reddit.com/r/cats/top/.json?sort=new&t=day&limit=100';
    public memeURL = [
        this.subreddit('memes'),
        this.subreddit('dank_meme'),
        this.subreddit('dankmemes'),
        this.subreddit('meirl'),
        this.subreddit('me_irl'),
        this.subreddit('funny'),
        this.subreddit('puns'),
        this.subreddit('surrealmemes'),
        'https://www.reddit.com/user/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=350'
    ];


    constructor(client: SnakeBot) {
        this.client = client;
    }

    public get random() {
        return this.memeURL[Math.floor(Math.random() * this.memeURL.length)];
    }

    public async cat(channel: string) {
        let chan = this.client.channels.get(channel) as TextChannel;
        if (!chan) return;
        return chan.send(await this.search_reddit(this.catURL));
    }

    public async dog(channel: string) {
        let chan = this.client.channels.get(channel) as TextChannel;
        if (!chan) return;
        return chan.send(await this.search_reddit(this.dogURL));
    }

    public async meme(channel: string) {
        let chan = this.client.channels.get(channel) as TextChannel;
        if (!chan) return;
        return chan.send(await this.search_reddit(this.random));
    }

    private async search_reddit(url: string): Promise<MessageEmbed | string> {
        return fetch(url)
            .then(data => data.json())
            .then(async (meme: any) => {
                if (!meme || !meme.data) return 'Something is wrong. Try again later';
                const post = meme.data.children
                    .filter((po: any) => po && po.data && po.data.preview)[Math.floor(Math.random() * meme.data.children.length)];

                return new MessageEmbed()
                    .setColor('AQUA')
                    .setTitle(post.data.title)
                    .setURL(post.data.url)
                    .setAuthor((this.client.user as ClientUser).tag, (this.client.user as ClientUser).displayAvatarURL())
                    .setImage(post.data.url)
                    .setFooter(`posted by ${post.data.author} | 👍 ${post.data.ups} | 💬 ${post.data.num_comments}`);
            });
    }
}
