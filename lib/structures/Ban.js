const BannedUser = require('./BannedUser');
const { noop } = require('../util');

let User = null;

try {
	({ User } = require('discord.js'));
} catch { noop }

class Ban {
	constructor(options = {}) {
		this.user = new BannedUser({ id: options.id, name: options.name, discriminator: options.discriminator });
		this.moderator = options.moderator_id || options.requested_by;
		this.reason = options.reason;
		this.proof = options.proof;
		this.active = options.is_ban_active;
		this.appealable = options.can_be_appealed;
	}

	setUser(id, name, discriminator) {
		if (User && id instanceof User) ({ id, username: name, discriminator } = id);
		this.user = new BannedUser({ id, name, discriminator });

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
			user_name: this.user.username,
			user_discriminator: this.user.discriminator,
			mod: this.moderator,
			reason: this.reason,
			proof: this.proof
		}
	}
}

module.exports = Ban;