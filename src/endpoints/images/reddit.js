const Endpoint = require('../../../lib/Endpoint');
const RedditImage = require('../../../lib/structures/RedditImage');

module.exports = class extends Endpoint {

	async run(subreddit, options = {}) {
		const remove_nsfw = options.removeNSFW || false;
		const span = options.span || 'day';
		return this.client.api.images['rand-reddit'][subreddit].get({ span, remove_nsfw });
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new RedditImage(data);
	}
}