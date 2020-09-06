const Endpoint = require('../../../lib/Endpoint');
const WeatherReport = require('../../../lib/structures/WeatherReport');

module.exports = class extends Endpoint {

	async run(query, options = {}) {
		const reg = /[0-9.]+, [0-9.]+/;
		const units = options.units || 'auto';
		const lang = options.lang || 'en';
		return reg.test(query)
			? this.client.api.kumo.weather[query].currently.get({ units, lang })
			: this.client.api.kumo.weather.currently.get({ q: query, units, lang }); /* eslint-disable-line id-length */
	}

	async serialize(data) {
		if (data.error) throw new Error(data.message);
		return new WeatherReport(data.data);
	}

};
