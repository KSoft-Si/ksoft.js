const Endpoint = require('../../../lib/Endpoint');
const RedditImage = require('../../../lib/structures/RedditImage');

module.exports = class extends Endpoint {

	async run() {
		return this.client.api.images['random-aww'].get();
	}

	async serialize(data) {
		return new RedditImage(data);
	}
}