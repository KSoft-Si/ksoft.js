const Endpoint = require('../../../lib/Endpoint');
const Artist = require('../../../lib/structures/Artist');

module.exports = class extends Endpoint {

	async run(id) {
		return this.client.api.lyrics.artist[id.toString() + '/'].get();
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new Artist(data.name, data.id, data.albums, data.tracks);
	}
}