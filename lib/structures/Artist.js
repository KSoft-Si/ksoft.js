class Artist {

	constructor(name, id, albums, tracks, primary) {
		this.name = name;
		this.id = parseInt(id) > 0 ? id : null;
		this.albums = [];
		if (albums && albums.length) {
			const Album = require('./Album');
			this.albums = albums.map(album => new Album(album.name, album.id, album.year));
		}
		this.tracks = [];
		if (tracks && tracks.length) {
			const Track = require('./Track');
			this.tracks = tracks.map(track => new Track(track.name, track.id));
		}
		this.primary = primary ?? null;
	}

}

module.exports = Artist;
