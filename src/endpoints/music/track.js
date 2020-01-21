const Endpoint = require('../../../lib/Endpoint');
const Track = require('../../../lib/structures/Track');

module.exports = class extends Endpoint {

	async run(id) {
		return this.client.api.lyrics.track[id.toString() + '/'].get();
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new Track(data.name, data.id, data.artist, data.albums, data.lyrics, data.url);
	}
}