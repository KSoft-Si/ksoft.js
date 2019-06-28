module.exports = class Ban {
	constructor() {
		// defaults
		this._data = {
			user: null,
			mod: null,
			user_name: null,
			user_discrim: null,
			reason: null,
			appeal_possible: true
		};
	}

	/**
	 *
	 * @param {String|User} user The user you want to ban
	 */

	setUserID(user) {
		if (user && typeof user === 'object') {
			this.setUserName(user.username);
			this.setUserDiscriminator(user.discriminator);
			this.user = user.id;
			return this;
		}
		if (typeof user !== 'string') throw new TypeError('[KSoft API] Please specify a valid user ID');
		this._data.user = user;
		return this;
	}

	/**
	 *
	 * @param {String|User} mod The mod that is banning the user
	 */
	setModID(mod) {
		if (mod && typeof mod === 'object') mod = mod.id;
		if (!id) throw new Error('[KSoft API] Please specify an ID');
		this._data.mod = id;
		return this;
	}
	/**
	 *
	 * @param {String} name The username of the person you are banning
	 */

	setUserName(name) {
		if (!name || typeof name !== 'string') throw new Error('[KSoft API] Please specify a valid name');
		this._data.user_name = name;
		return this;
	}

	/**
	 *
	 * @param {String} discrim The discriminator of the person you are banning
	 */
	setUserDiscriminator(discrim) {
		if (typeof discrim === 'number') discrim = discrim.toString().padStart(4, '0');
		if (!discrim || typeof discrim !== 'string') throw new Error('[KSoft API] Please specify a valid discrim');
		this._data.user_discriminator = discrim;
		return this;
	}
	/**
	 *
	 * @param {String} reason The reason you are banning this person
	 */
	setReason(reason) {
		if (!reason || !typeof reason !== 'string') throw new Error('[KSoft API] Please specify a valid reason');
		this._data.reason = reason;
		return this;
	}
	/**
	 *
	 * @param {String|String[]} proof Your proof
	 */
	setProof(proof) {
		if (Array.isArray(proof)) proof = proof.join('\n');
		if (!proof || !typeof proof !== 'string') throw new Error('[KSoft API] Please specify valid proof');
		this._data.proof = proof;
		return this;
	}
	/**
	 *
	 * @param {Boolean} boolean Whether or not this ban is appealable
	 */
	isAppealable(appealable = true) {
		if (typeof appealable !== 'boolean')
			throw new TypeError(
				'[KSoft API] Appealable must be a boolean'
			);
		this._data.appeal_possible = appealable;
		return this;
	}
};
