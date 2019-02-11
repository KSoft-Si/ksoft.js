const http = require('centra');

class bans {
	constructor(token) {
		/** @access private*/
		this.token = token;
		/** @access private*/
		this.baseURL = 'https://api.ksoft.si';
	}
	/**
	 * @param {banInfo} banData
	 * @returns {Promise<BanAddResponse>} If the Post was successful or not
	 */
	add(banData) {
		if (!banData) throw new Error('[Ksoft API] Please specify the banData');
		if (banData._data) {
			const jsonBanData = banData._data;

			if (!jsonBanData.user || !jsonBanData.proof || !jsonBanData.reason)
				throw new Error(
					'[Ksoft API] user, reason, and proof fields are required'
				);

      if (typeof jsonBanData.appeal_possible === 'boolean') {
        jsonBanData.appeal_possible = jsonBanData.appeal_possible.toString();
      }

			return http(this.baseURL, 'POST')
			  .path('/bans/add')
				.header('Authorization', `Bearer ${this.token}`)
				.body(jsonBanData, 'form')
         .send()
         .then(res => res.json());
    }

    return http(this.baseURL, 'POST')
				.path('/bans/add')
				.header('Authorization', `Bearer ${this.token}`)
				.body(banData, 'form')
        .send()
        .then(res => res.json());
	}
	/**
	 * @param {String} userID The userID of the person you want to get info for
	 * @returns {Promise<BanInfoRespnse>} info about the ban
	 */
	getBanInfo(userID) {
		if (!userID) throw new Error('[Ksoft API] Please specify user ID');
		if (typeof userID !== 'string')
      throw new Error('[Ksoft API] userID must be a string');

    return http(this.baseURL)
				.path('/bans/info')
				.header('Authorization', `Bearer ${this.token}`)
				.query('user', userID)
        .send()
        .then(res => res.json());
	}
	/**
	 * @param {String} userID The user id for the person being banned
	 * @returns {Promise<banCheckResponse>} Whether or not the ban is active
	 */
	check(userID) {
		if (!userID) throw new Error('[Ksoft API] Please specify user ID');
		if (typeof userID !== 'string')
      throw new Error('[Ksoft API] userID must be a string');

    return http(this.baseURL)
				.path('/bans/check')
				.header('Authorization', `Bearer ${this.token}`)
				.query('user', userID)
        .send()
        .then(res => res.json());
	}
	/**
	 *
	 * @param {Number} page Which page to return
	 * @param {Number} perPage How many items per page
	 * @returns {Promise<banListResponse>} List of ban objects
	 */
	list(page, perPage) {
		const params = {};
		if (page) params.page = page;
		if (perPage) params.per_page = perPage;

		return http(this.baseURL)
				.path('/bans/list')
				.query(params)
				.header('Authorization', `Bearer ${this.token}`)
        .send()
        .then(res => res.json());
	}
	/**
	 * @param {Number} epochDate An epoch date. Example: 1539915420 (October 19 2018)
	 * @returns {Promise<banUpdatesResponse>} List of bans on that date. will return empty array if nothing on that date
	 */
	getUpdate(epochDate) {
		if (!epochDate)
			throw new Error(
				'[Ksoft API] Please specify an epochDate. Example: 1539915420'
			);

		return http(this.baseURL)
				.path('/bans/updates')
				.query('timestamp', epochDate)
				.header('Authorization', `Bearer ${this.token}`)
        .send()
        .then(res => res.json());
	}
	/**
	 *
	 * @param {Array<String>} ids Array of id's to check
	 * @param {Boolean} bannedOnly Whether or to return an array of the id's of the people that are banned in that array of id's
	 * @param {Boolean} moreInfo Whether to return the full ban object if the person is banned
	 * @param {Boolean} advancedBannedOnly Checks every user in the list given and filter out the people that are not banned and will return their whole ban object. Will throw an error if there are no banned people in the list. Use .catch() to manage the error
	 * @returns {Promise<Array<bulkCheckResponse|simpleBanInfo>>} BulkCheck response
	 */
	bulkCheck(ids, { bannedOnly, moreInfo, advancedBannedOnly }) {
		if (!ids) throw new Error("[Ksoft API] Please specify an array of id's");
		const options = { users: ids.join(',') };
		if (bannedOnly) options.banned_only = bannedOnly;
		if (moreInfo) options.more_info = moreInfo;

		if (advancedBannedOnly) {
      return http(this.baseURL)
        .path('/bans/bulkcheck')
        .header('Authorization', `Bearer ${this.token}`)
        .query({
          users: ids.join(','),
          more_info: true
        })
        .send()
        .then(res => res.json())
        .then(bans => bans.filter(b => b.is_ban_active));

			//if (finalResult.length <= 1)
				//throw new Error('there are no bans in the current array');
		} else {
      return http(this.baseURL)
				.path('/bans/bulkcheck')
				.header('Authorization', `Bearer ${this.token}`)
				.query(options)
				.send()
				.then(res => res.json());
		}
	}

	/**
	 *
	 * @param {Collection} guildMemberCollection The discord.js guildMembers collection for the guild you are testing
	 * @param {Boolean} moreInfo Whether you want it to return the full ban object if a person is banned
	 * @param {Boolean} ignoreBots Whether you want the search to ignore bots
	 * @returns {Promise<bulkCheckResponse|simpleBanInfo>} BulkCheck response
	 */
	guildMembersCheck(guildMemberCollection, { moreInfo, ignoreBots }) {
		let members = guildMemberCollection.map(m => m.id);
		if (ignoreBots) {
			members = guildMemberCollection.filter(m => !m.user.bot).map(m => m.id);
    }

    return this.bulkCheck(members, {
			moreInfo: moreInfo
		});
	}
};

module.exports = {
	bans
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
