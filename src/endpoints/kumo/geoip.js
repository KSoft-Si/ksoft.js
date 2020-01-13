const Endpoint = require('../../../lib/Endpoint');
const IPReport = require('../../../lib/structures/IPReport');

module.exports = class extends Endpoint {

	/**
	 * Performs a GeoIP lookup
	 * @param {string} ip - The IP to look up
	 * @returns {IPReport}
	 */
	async run(ip) {
		return this.client.api.kumo.geoip.get({ ip });
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new IPReport(data.data);
	}
}