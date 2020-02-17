export interface WSMessageReactionAdd {
    user_id: string;
    message_id: string;
    emoji: EmojiData;
    channel_id: string;
    guild_id: string;
}

export interface EmojiData {
    name: string;
    id?: string;
}
