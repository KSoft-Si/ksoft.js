const SpotifyAlbum = require('./SpotifyAlbum');
const SpotifyArtist = require('./SpotifyArtist');

class SpotifyTrack {
	constructor(data) {
		this.id = data.id;
		this.link = data.link;
		this.title = data.name;
		this.album = new SpotifyAlbum(data.album);
		this.artists = this._constructArtists(data.artists);
	}

	_constructArtists(data) {
		const artists = [];
		for (const artist of data) {
			artists.push(new SpotifyArtist(artist));
		}
		return artists;
	}
}

module.exports = SpotifyTrack;