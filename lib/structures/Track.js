const Lyrics = require('./Lyrics');
const DeezerConnection = require('./DeezerConnection');
const SpotifyConnection = require('./SpotifyConnection');

class Track {

	constructor(name, id, artists, albums, lyrics, url, art, singalong, meta) {
		this.name = name;
		this.id = parseInt(id) > 0 ? id : null;
		this.artists = [];
		if (artists) {
			const Artist = require('./Artist');
			if (Array.isArray(artists)) {
				this.artists = artists.map(artist => new Artist(artist.name, artist.id, null, null, artist.primary || false));
			} else {
				this.artists = [new Artist(artists.name, artists.id, null, null, true)];
			}
		}
		this.albums = [];
		if (albums && albums.length) {
			const Album = require('./Album');
			this.albums = albums.map(album => new Album(album.name, album.id, album.year));
		}
		this.lyrics = new Lyrics(lyrics, singalong);
		this.url = url;
		this.artwork = art;

		this.bpm = meta?.other?.bpm || null;
		this.gain = meta?.other?.gain || null;

		this.connections = [];

		if (meta.spotify) this.connections.push(new SpotifyConnection(meta.spotify));
		if (meta.deezer) this.connections.push(new DeezerConnection(meta.deezer));
	}

}

module.exports = Track;
