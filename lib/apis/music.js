/**
 * @typedef {Object} recommendationsResponse The response for music.recommendations
 * @prop {String} provider The music provider
 * @prop {Number} total The total number of responses
 * @prop {Array<track>} tracks The array of tracks. Please go to https://docs.ksoft.si/api/lyrics-api#music-recommendations for more info.
 */
const axios = require('axios');
module.exports = class music {
	constructor(token) {
		this.token = token;
		this.http = axios.create({
			baseURL: 'https://api.ksoft.si',
			timeout: 2000,
			headers: { Authorization: `NANI ${this.token}` }
		});
	}
	/**
	 * @param {String} provider The music provider you want to use, can be: youtube for list of YouTube links, youtube_ids for list of YouTube video IDs, or spotify for list of Spotify IDs
	 * @param {Array<String> | String} tracks The list of tracks you want to get recommendations for. Can be an array or a new line seperated string or a comma seperated string.
	 * @return {Promise<recommendationsResponse>}
	 */

	async recommendations(provider, tracks) {
		if (!provider || !tracks) throw new Error('[Ksoft API] Please specify the provider and tracks parameters');

		const { data } = await this.http.post('/music/recommendations', {
			provider: provider,
			tracks: tracks
		});

		return data;
	}
};
