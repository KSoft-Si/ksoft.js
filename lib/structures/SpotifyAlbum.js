class SpotifyAlbum {
	constructor(data) {
		this.title = data.name;
		this.link = data.link;
		this.art = data.album_art;
	}
}

module.exports = SpotifyAlbum;