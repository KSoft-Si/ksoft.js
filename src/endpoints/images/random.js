const Endpoint = require('../../../lib/Endpoint');
const Image = require('../../../lib/structures/Image');

module.exports = class extends Endpoint {

	async run(tag, options = {}) {
		const nsfw = options.nsfw || false;
		return this.client.api.images['random-image'].get({ tag, nsfw });
	}

	async serialize(data) {
		if (data.code === 404) throw new Error(data.message);
		return new Image(data);
	}
}
