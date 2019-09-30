const Endpoint = require('../../../lib/Endpoint');
const IPReport = require('../../../lib/structures/IPReport');

module.exports = class extends Endpoint {

	async run(ip) {
		return this.client.api.kumo.geoip.get({ ip });
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new IPReport(data.data);
	}
}