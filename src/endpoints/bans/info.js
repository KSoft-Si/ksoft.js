const Endpoint = require('../../../lib/Endpoint');
const Ban = require('../../../lib/structures/Ban');

module.exports = class extends Endpoint {

	async run(user) {
		return this.client.api.bans.info.get({ user });
	}

	async serialize(data) {
		if (data.error || !data.exists) return null;
		return new Ban(data);
	}
}