const YouTubeTrack = require('./YouTubeTrack');
const SpotifyTrack = require('./SpotifyTrack');

class Suggestion {
	constructor(data) {
		this.title = data.name;
		this.youtube = new YouTubeTrack(data.youtube);
		this.spotify = new SpotifyTrack(data.spotify);
	}
}

module.exports = Suggestion;