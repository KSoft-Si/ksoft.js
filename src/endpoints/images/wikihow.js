const Endpoint = require('../../../lib/Endpoint');
const WikiHowImage = require('../../../lib/structures/WikiHowImage');

module.exports = class extends Endpoint {

	async run() {
		return this.client.api.images['random-wikihow'].get();
	}

	async serialize(data) {
		return new WikiHowImage(data);
	}
}