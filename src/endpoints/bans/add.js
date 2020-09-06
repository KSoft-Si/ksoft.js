const Endpoint = require('../../../lib/Endpoint');
const Ban = require('../../../lib/structures/Ban');
const BanAPIResponse = require('../../../lib/structures/BanAPIResponse');

module.exports = class extends Endpoint {

	async run(ban) {
		if (!(ban instanceof Ban)) throw new SyntaxError('Please use the ban builder');
		return this.client.api.bans.add.post(ban.apiObject, true);
	}

	async serialize(data) {
		return new BanAPIResponse(data);
	}

};
