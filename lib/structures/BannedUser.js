class BannedUser {
	constructor({ id, name, discriminator }) {
		this.id = id;
		this.username = name || null;
		this.discriminator = discriminator || null;
	}

	toJSON() {
		return;
	}
}

module.exports = BannedUser;