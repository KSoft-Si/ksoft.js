/**
 * Used for representing a music album for the lyrics or album endpoints
 * @property {string} name - The name of the artist
 * @property {string} id - Unique identifier
 * @property {number} year - Release year
 * @property {Artist} [artist] - Artist of this album
 * @property {Track[]} [tracks] - Tracks in this album
 */
class Album {

	/**
	 * 
	 * @param {string} name 
	 * @param {string} id 
	 * @param {string|number} year 
	 * @param {Artist} artist 
	 * @param {Track[]} tracks 
	 */
	constructor(name, id, year, artist, tracks) {
		this.name = name;
		this.id = parseInt(id) > 0 ? id : null;
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