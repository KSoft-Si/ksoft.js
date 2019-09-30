class Conversion {
	constructor(value, pretty) {
		this.value = value;
		this.pretty = pretty;
	}

	toString() {
		return this.pretty;
	}
}

module.exports = Conversion;