class YouTubeTrack {
	constructor(data) {
		this.id = data.id;
		this.link = data.link;
		this.title = data.title;
		this.thumbnail = data.thumbnail;
		this.description = data.description;
	}
}

module.exports = YouTubeTrack;