const Endpoint = require('../../../lib/Endpoint');
const Album = require('../../../lib/structures/Album');

module.exports = class extends Endpoint {

	async run(id) {
		return this.client.api.lyrics.album[id.toString() + '/'].get();
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new Album(data.name, data.id, data.year, data.artist, data.tracks);
	}
}