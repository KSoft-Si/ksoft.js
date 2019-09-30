class Album {
	constructor(name, id, year, artist, tracks) {
		this.name = name;
		this.id = parseInt(id) > 0 ? parseInt(id) : null;
		this.year = parseInt(year);
		this.artist = null;
		if (artist) {
			const Artist = require('./Artist');
			this.artist = new Artist(artist.name, artist.id)
		}
		this.tracks = [];
		if (tracks && tracks.length) {
			const Track = require('./Track');
			this.tracks = tracks.map(track => new Track(track.name, track.id));
		}
	}
}

module.exports = Album;