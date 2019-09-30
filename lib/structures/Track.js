class Track {
	constructor(name, id, artist, albums, lyrics) {
		this.name = name;
		this.id = parseInt(id) > 0 ? parseInt(id) : null;
		this.artist = null;
		if (artist) {
			const Artist = require('./Artist');
			this.artist = new Artist(artist.name, artist.id)
		}
		this.albums = [];
		if (albums && albums.length) {
			const Album = require('./Album');
			this.albums = albums.map(album => new Album(album.name, album.id, album.year));
		}
		this.lyrics = lyrics;
	}
}

module.exports = Track;