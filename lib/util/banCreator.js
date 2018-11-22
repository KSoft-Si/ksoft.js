module.exports = class Ban {
	constructor() {
		this.data = {};
	}

	/**
	 *
	 * @param {String} id The id of the user you want to ban
	 */

	setUserID(id) {
		if (!id) throw new Error('[Ksoft API] Please specify an ID');
		this.data.user = id;
		return this;
	}

	/**
	 *
	 * @param {String} id The id of the mod that is banning the user
	 */
	setModID(id) {
		if (!id) throw new Error('[Ksoft API] Please specify an ID');
		this.data.mod = id;
		return this;
	}
	/**
	 *
	 * @param {String} name The username of the person you are banning
	 */

	setUserName(name) {
		if (!name) throw new Error('[Ksoft API] Please specify a name');
		this.data.user_name = name;
		return this;
	}

	/**
	 *
	 * @param {String} discrim The discriminator of the person you are banning
	 */
	setUserDiscriminator(discrim) {
		if (!discrim) throw new Error('[Ksoft API] Please specify a discrim');
		this.data.user_discriminator = discrim;
		return this;
	}
	/**
	 *
	 * @param {String} reason The reason you are banning this person
	 */
	setReason(reason) {
		if (!reason) throw new Error('[Ksoft API] Please specify a reason');
		this.data.reason = reason;
		return this;
	}
	/**
	 *
	 * @param {String} proof Your proof
	 */
	setProof(proof) {
		if (!proof) throw new Error('[Ksoft API] Please specify proof');
		this.data.proof = proof;
		return this;
	}
	/**
	 *
	 * @param {Boolean} boolean Whether or not this ban is appealable
	 */
	isAppealable(boolean = 'true') {
		if (boolean === undefined) throw new Error('[Ksoft API] Please specify whether it is appealable or not');
		this.data.appeal_possible = boolean;
		return this;
	}
};
