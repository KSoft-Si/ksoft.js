class Endpoint {

	constructor(client) {
		this.client = client;
	}

	run() {
		throw new SyntaxError('Run method should be overwritten in actual endpoint.');
	}

	async _run(...args) {
		const data = await this.run(...args);
		return this.serialize(data);
	}

	serialize() {
		throw new SyntaxError('Serialize method should be overwritten in actual endpoint.');
	}

}

module.exports = Endpoint;