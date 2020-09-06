const BannedUser = require('./BannedUser');

class Ban {

	constructor(options = {}) {
		this.user = new BannedUser({ id: options.id, name: options.name, discriminator: options.discriminator });
		this.moderator = options.moderator_id || options.requested_by;
		this.reason = options.reason;
		this.proof = options.proof;
		this.active = options.is_ban_active;
		this.appealable = options.can_be_appealed;
	}

	setUser(id) {
		this.user = new BannedUser({ id });

		return this;
	}

	setModerator(id) {
		this.moderator = id;
		return this;
	}

	setReason(reason, proof) {
		this.reason = reason;
		this.proof = proof;
		return this;
	}

	get apiObject() {
		return {
			user: this.user.id,
			mod: this.moderator,
			reason: this.reason,
			proof: this.proof
		};
	}

}

module.exports = Ban;
