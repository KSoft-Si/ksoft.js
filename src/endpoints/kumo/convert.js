const Endpoint = require('../../../lib/Endpoint');
const Conversion = require('../../../lib/structures/Conversion');

module.exports = class extends Endpoint {

	/**
	 * Convert one currency to another
	 * @param {number} value - The currency amount
	 * @param {string} from - The currency you're converting from
	 * @param {string} to - The currency you're converting to
	 * @returns {Conversion}
	 */
	async run(value, from, to) {
		return this.client.api.kumo.currency.get({ value, from, to });
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new Conversion(data.value, data.pretty);
	}
}