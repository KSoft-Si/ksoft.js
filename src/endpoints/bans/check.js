const Endpoint = require('../../../lib/Endpoint');

module.exports = class extends Endpoint {

	/**
	 * Check if a user is banned on KSoft
	 * @param {string|string[]} user - ID or Array of IDs of users to check
	 * @returns {Promise<boolean>|Promise<string[]>} Boolean if checking one user, array of banned ids for bulk check
	 */
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
}