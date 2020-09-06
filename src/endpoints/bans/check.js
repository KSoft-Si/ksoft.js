const Endpoint = require('../../../lib/Endpoint');

module.exports = class extends Endpoint {

	async run(user) {
		return Array.isArray(user)
			? this.client.api.bans.bulkcheck.get({ users: user.join(','), banned_only: true })
			: this.client.api.bans.check.get({ user });
	}

	async serialize(data) {
		return Array.isArray(data)
			? data
			: data.is_banned;
	}

};
