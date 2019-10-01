class BanAPIResponse {
	constructor(data) {
		this.success = data.success;
		this.message = data.message || null;
	}
}

module.exports = BanAPIResponse;