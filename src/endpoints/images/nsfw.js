const Endpoint = require('../../../lib/Endpoint');
const RedditImage = require('../../../lib/structures/RedditImage');

module.exports = class extends Endpoint {

	async run(gifs = false) {
		return this.client.api.images['random-nsfw'].get({ gifs });
	}

	async serialize(data) {
		return new RedditImage(data);
	}
}