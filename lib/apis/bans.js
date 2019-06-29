module.exports = class BanAPI {

	constructor(client) {
		this.api = client.api
			.path('bans');
	}
	/**
	 * @param {banInfo} banData
	 * @returns {Promise<BanAddResponse>} If the Post was successful or not
	 */
	async add(banData) {
		if (!banData) throw new SyntaxError('[KSoft API] Please specify the banData');
		if (banData._data) {
			const jsonBanData = banData._data;

			if (!jsonBanData.user || !jsonBanData.proof || !jsonBanData.reason) { throw new SyntaxError('[KSoft API] user, reason, and proof fields are required'); }


			banData = jsonBanData;
		}

		try {
			const res = await this.api
				.method('POST')
				.path('add')
				.body(banData, 'form')
				.send();
			return res.json;
		} catch (err) {
			console.error(`[KSoft API] ${err}`);
		}
	}
	/**
	 * @param {String|User} user The user you want to get info for
	 * @returns {Promise<BanInfoRespnse>} info about the ban
	 */
	async info(user) {
		if (!user) throw new SyntaxError('[KSoft API] Please specify user ID');
		if (typeof user === 'object') user = user.id;
		if (typeof user !== 'string') throw new TypeError('[KSoft API] user must be a string or discord.js user.');
		try {
			const res = await this.api
				.path('info')
				.query('user', user)
				.send();
			return res.json;
		} catch (err) {
			console.error(`[KSoft API] ${err}`);
		}
	}
	/**
	 * @param {String} user the person being banned
	 * @returns {Promise<banCheckResponse>} Whether or not the ban is active
	 */
	async check(userID) {
		if (!userID) throw new SyntaxError('[KSoft API] Please specify user ID');
		if (typeof userID !== 'string') { throw new TypeError('[KSoft API] userID must be a string'); }
		try {
			const res = await this.api
				.path('check')
				.query('user', userID)
				.send();
			return res.json;
		} catch (err) {
			console.error(`[KSoft API] ${err}`);
		}
	}
	/**
	 *
	 * @param {Number} page Which page to return
	 * @param {Number} perPage How many items per page
	 * @returns {Promise<banListResponse>} List of ban objects
	 */
	async list(page, perPage) {
		const params = {};
		if (page) params.page = page;
		if (perPage) params.per_page = perPage;

		try {
			const res = await this.api
				.path('list')
				.query(params)
				.send();
			return res.json;
		} catch (err) {
			console.error(`[KSoft API] ${err}`);
		}
	}
	/**
	 * @param {Number} epochDate An epoch date. Example: 1539915420 (October 19 2018)
	 * @returns {Promise<banUpdatesResponse>} List of bans on that date. will return empty array if nothing on that date
	 */
	async getUpdate(epochDate) {
		if (!epochDate) { throw new SyntaxError('[KSoft API] Please specify an epochDate. Example: 1539915420'); }

		try {
			const res = await this.api
				.path('updates')
				.query('timestamp', epochDate)
				.send();
			return res.json;
		} catch (err) {
			console.error(`[KSoft API] ${err}`);
		}
	}
	/**
	 *
	 * @param {Array<String>} ids Array of id's to check
	 * @param {Boolean} bannedOnly Whether or to return an array of the id's of the people that are banned in that array of id's
	 * @param {Boolean} moreInfo Whether to return the full ban object if the person is banned
	 * @param {Boolean} advancedBannedOnly Checks every user in the list given and filter out the people that are not banned
	 * @returns {Promise<Array<bulkCheckResponse|simpleBanInfo>>} BulkCheck response
	 */
	async bulkCheck(ids, { bannedOnly, moreInfo, advancedBannedOnly }) {
		if (!ids || !Array.isArray(ids)) throw new TypeError('[KSoft API] Please specify an array of IDs');
		const options = { users: ids.join(',') };
		if (bannedOnly) options.banned_only = bannedOnly;
		if (moreInfo) options.more_info = moreInfo;


		if (advancedBannedOnly) {
			return this.getAdvancedBans(ids);
		} else {
			try {
				const res = await this.api
					.path('bulkcheck')
					.query(options)
					.send();
				return res.json;
			} catch (err) {
				console.error(`[KSoft API] ${err}`);
			}
		}
	}

	async getAdvancedBans(ids) {
		return this.api
			.path('bulkcheck')
			.query({
				users: ids.join(','),
				more_info: true
			})
			.send()
			.then(res => res.json);
	}

	/**
	 *
	 * @param {Collection} guildMemberCollection The discord.js guildMembers collection for the guild you are testing
	 * @param {Boolean} moreInfo Whether you want it to return the full ban object if a person is banned
	 * @param {Boolean} ignoreBots Whether you want the search to ignore bots
	 * @returns {Promise<bulkCheckResponse|simpleBanInfo>} BulkCheck response
	 */
	async guildMembersCheck(guildMemberCollection, { moreInfo, ignoreBots }) {
		if (ignoreBots) {
			guildMemberCollection = guildMemberCollection.filter(m => !m.user.bot);
		}
		const members = guildMemberCollection.map(m => m.id);
		const result = await this.bulkCheck(members, {
			moreInfo
		});

		return result;
	}

};


/**
 * @typedef {Object} banInfo Ban info
 * @prop {Number} user Users Discord ID that you are banning/reporting
 * @prop {Number} mod Users Discord ID who posted/reported the ban
 * @prop {String} user_name Users Discord username
 * @prop {Number} user_discriminator Users Discord discriminator
 * @prop {String} reason Reason why user should be globally banned
 * @prop {String} proof URL of the image showing the act
 * @prop {Boolean} appeal_possible If appeal should be disabled for that user.
 *
 * @typedef {Object} BanAddResponse The response from bans.add
 * @prop {String} Success Whether it was successful or not
 *
 * @typedef {Object} BanInfoRespnse The response for bans.getBanInfo
 * @prop {Number} id The id of the person banned
 * @prop {String} name Name of the person banned
 * @prop {String} discriminator The #discriminator of the person banned
 * @prop {Number} moderator_id The id of the moderator who banned the person
 * @prop {String} reason The reason for the ban
 * @prop {String} proof The url for the picture or video of the person doing the thing that got them banned
 * @prop {Boolean} is_ban_active Whether or not the ban is active
 * @prop {Boolean} can_be_appealed Whether or not the ban can be appealed
 * @prop {String} timestamp The timestamp of the ban
 * @prop {String} appeal_reason the reason of the appeal if available
 * @prop {String} appeal_date The date of the appeal if available
 * @prop {String} requested_by The person who requested this information
 * @prop {Boolean} exists Whether or not this ban exists
 *
 * @typedef {Object} banCheckResponse The response for bans.check
 * @prop {Boolean} is_banned Whether or not this person is banned
 *
 * @typedef {Object} banListResponse The response of bans.list
 * @prop {Number} ban_count How many bans the api is holding
 * @prop {Number} page_count How many pages are in the api
 * @prop {Number} per_page How many bans are on each page
 * @prop {Number} page What page your on
 * @prop {Number} on_page How many bans are on this page
 * @prop {Number} next_page The numer of the next page
 * @prop {any} previous_page The number of the previous page. Will return null if 0
 * @prop {Array<BanInfoRespnse>} data List of bans
 *
 * @typedef {Object} SimpleBanObject Basic ban info
 * @prop {Number} id ID of the user banned
 * @prop {String} reason Reason for the ban
 * @prop {String} proof Proof of the ban
 * @prop {Number} moderator_id ID of the moderator who banned the person
 * @prop {Boolean} active Whether or not the ban is active
 *
 * @typedef {Object} banUpdatesResponse The response of bans.getUpdates
 * @prop {Array<SimpleBanObject>} data Array of bans on that date
 * @prop {Number} current_timestamp Current timestamp of update
 *
 * @typedef {Object} bulkCheckResponse The response of bans.bulkCheck
 * @prop {Number} id The id of the user the response is for
 * @prop {String} name The name of the user the response is for
 * @prop {String} discriminator The discriminator the response if for
 * @prop {Number} moderator_id The moderator id
 * @prop {String} reason The reason for the ban
 * @prop {String} proof The proof for the ban
 * @prop {Boolean} is_ban_active Whether or not the ban is active
 * @prop {Boolean} can_be_appealed Whether or not the ban can be appealed
 * @prop {String} timestamp The timestamp for the ban
 * @prop {String|null} appeal_reason The appeal reason if there is one
 * @prop {String|null} appeal_date The appeal date
 * @prop {Boolean} exists Whether or not the ban exists
 *
 * @typedef {Object} simpleBanInfo the simple response of bans.bulkCheck
 * @prop {Number} id The id the response is for
 * @prop {Boolean} is_ban_active Whether or not the ban is active
 * @prop {Boolean} exists Wether or not the ban is active
 */
