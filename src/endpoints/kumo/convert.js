const Endpoint = require('../../../lib/Endpoint');
const Conversion = require('../../../lib/structures/Conversion');

module.exports = class extends Endpoint {

	async run(value, from, to) {
		return this.client.api.kumo.currency.get({ value, from, to });
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new Conversion(data.value, data.pretty);
	}
}