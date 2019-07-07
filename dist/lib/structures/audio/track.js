"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AudioTrack {
    constructor(msg, LavalinkTrack) {
        this.requester = msg.author.id;
        this.track = LavalinkTrack.track;
        this.votes = [];
        this.identifier = LavalinkTrack.info.identifier;
        this.isSeekable = LavalinkTrack.info.isSeekable;
        this.thumbnail = `https://i.ytimg.com/vi/${this.identifier}/mqdefault.jpg`;
        this.author = LavalinkTrack.info.author;
        this.length = { parsed: LavalinkTrack.info.length, millis: LavalinkTrack.info.length };
        this.title = LavalinkTrack.info.title;
        this.uri = LavalinkTrack.info.uri;
    }
}
exports.default = AudioTrack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3N0cnVjdHVyZXMvYXVkaW8vdHJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxNQUFxQixVQUFVO0lBWTNCLFlBQVksR0FBaUIsRUFBRSxhQUFrQjtRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFJLEdBQUcsQ0FBQyxNQUFlLENBQUMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRywwQkFBMEIsSUFBSSxDQUFDLFVBQVUsZ0JBQWdCLENBQUM7UUFDM0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN0QyxDQUFDO0NBRUo7QUExQkQsNkJBMEJDIn0=