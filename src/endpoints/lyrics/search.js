const Endpoint = require('../../../lib/Endpoint');
const Track = require('../../../lib/structures/Track');

module.exports = class extends Endpoint {

	async run(query, options = {}) {
		if (!query) throw new SyntaxError('No query');
		const limit = options.limit || 10;
		const text_only = options.textOnly || false;
		return this.client.api.lyrics.search({ q: query, limit, text_only });
	}

	async serialize(data) {
		if (!data.data.length) throw new Error('No results');
		return data.data.map(track => new Track(track.name, track.id,
			{ name: track.artist, id: track.artist_id },
			this.createAlbums(track.album, track.album_ids, track.album_year),
			this.normalizeLyrics(track.lyrics), track.url, track.album_art));
	}

	normalizeLyrics(text) {
		if (text.startsWith('\n')) text = text.replace(/^(\n)+/, '');
		return text.replace(/(\n){3,}/g, '\n\n');
	}

	createAlbums(_names, _ids, _years) {
		const names = _names.split(','), ids = _ids.split(','), years = _years.split(',');
		const albums = [];
		for (let i = 0; i < ids.length; i++) {
			albums.push({ name: names[i], id: ids[i], year: years[i] });
		}
		return albums;
	}
}