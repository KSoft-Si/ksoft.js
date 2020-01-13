const Endpoint = require('../../../lib/Endpoint');
const Ban = require('../../../lib/structures/Ban');

module.exports = class extends Endpoint {

	/**
	 * Get information about bans on KSoft
	 * @param {string|string[]} user - The user or users to get ban information about
	 * @returns {Promise<Ban>|Promise<Ban[]>}
	 */
	async run(user) {
		return Array.isArray(user)
			? this.client.api.bans.bulkcheck.get({ users: user.join(','), more_info: true })
			: this.client.api.bans.info.get({ user });
	}

	async serialize(data) {
		if (Array.isArray(data)) {
			return data.filter(rawBan => rawBan.is_ban_active).map(rawBan => new Ban(rawBan));
		} else {
			if (data.error || !data.exists) return null;
			return new Ban(data);
		}
	}
}
