module.exports = class MusicAPI {
	constructor(client) {
		this.api = client.api
			.path('music');
	}
	/**
	 * @param {String} provider The music provider you want to use, can be: youtube for list of YouTube links, youtube_ids for list of YouTube video IDs, or spotify for list of Spotify IDs
	 * @param {Array<String> | String} tracks The list of tracks you want to get recommendations for. Can be an array or a new line seperated string or a comma seperated string.
	 * @return {Promise<recommendationsResponse>}
	 */

	async recommendations(provider, tracks) {
		if (!provider || !tracks)
			throw new SyntaxError('[KSoft API] Please specify the provider and tracks parameters');
		const allowedProviders = ['youtube_ids', 'youtube', 'spotify'];
		if (!allowedProviders.some(item => item === provider))
			throw new RangeError('[KSoft API] Please specify the correct provider. Options: youtube_ids, youtube, spotify');
		if (typeof tracks === 'string') {
			if (tracks.includes(',')) { tracks = tracks.split(',').map(t => t.trim()); }
			else if (tracks.indluces('\n')) { tracks = tracks.split('\n'); }
			else { tracks = [tracks] }
		} else {
			if (!Array.isArray(tracks)) throw new TypeError('[KSoft API] Tracks must be either of type String or Array<String>')
		}

		if (!tracks.length)
			throw new RangeError('[KSoft API] Please provide a track to search');
		if (tracks.length > 5)
			throw new RangeError('[KSoft API] Please provide less than or equal to 5 tracks');
		const res = await this.api
			.method('POST')
			.path('recommendations')
			.body({ provider, tracks })
			.send();

		return res.json;
	}
};

/**
 * @typedef {Object} recommendationsResponse The response for music.recommendations
 * @prop {String} provider The music provider
 * @prop {Number} total The total number of responses
 * @prop {Array<track>} tracks The array of tracks. Please go to https://docs.ksoft.si/api/lyrics-api#music-recommendations for more info.
 */
