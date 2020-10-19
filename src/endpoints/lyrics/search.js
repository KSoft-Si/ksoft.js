const Endpoint = require('../../../lib/Endpoint');
const Track = require('../../../lib/structures/Track');

module.exports = class extends Endpoint {

	async run(query, options = {}) {
		if (!query) throw new SyntaxError('No query');
		const limit = options.limit || 10;
		const text_only = options.textOnly || false;
		return this.client.api.lyrics.search({ q: query, limit, text_only }); /* eslint-disable-line id-length */
	}

	async serialize(data) {
		if(!data.data) throw new Error('No Data found, you are likely using the wrong token (V1 token is the correct token)')
		if (!data.data.length) throw new Error('No results');

		return data.data.map(track => {
			const artists = track?.meta.artists
				? track.meta.artists.map(artist => ({ id: artist.id, primary: artist.is_primary, name: artist.name }))
				: { name: track.artist, id: track.artist_id };
			return new Track(track.name, track.id,
				artists,
				this.createAlbums(track.album, track.album_ids, track.album_year),
				this.normalizeLyrics(track.lyrics), track.url, track.album_art, track.singalong, track.meta);
		});
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

};
