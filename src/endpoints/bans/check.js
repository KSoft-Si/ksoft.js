const Endpoint = require('../../../lib/Endpoint');

module.exports = class extends Endpoint {

	async run(user) {
		return this.client.api.bans.check.get({ user });
	}

	async serialize(data) {
		return data.is_banned;
	}
}