const Endpoint = require('../../../lib/Endpoint');
const Image = require('../../../lib/structures/Image');

module.exports = class extends Endpoint {

	async run(id) {
		return this.client.api.images.image[id].get();
	}

	async serialize(data) {
		if (data.code === 404) throw new Error(data.message);
		return new Image(data);
	}
}