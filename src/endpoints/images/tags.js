const Endpoint = require('../../../lib/Endpoint');
const Tag = require('../../../lib/structures/Tag');

module.exports = class extends Endpoint {

	async run() {
		return this.client.api.images.tags.get();
	}

	async serialize(data) {
		const tags = [];
		for (const tag of data.models) {
			tags.push(new Tag(tag.name, tag.nsfw));
		}
		return tags;
	}
}