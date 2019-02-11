const fetch = require('centra');

class music {
	constructor(token) {
		/** @access private*/
		this.token = token;
		/** @access private*/
		this.baseURL = 'https://api.ksoft.si';
		/** @access private*/
		this.http = fetch(this.baseURL, 'POST').header(
			'Authorization',
			`Bearer ${this.token}`
		);
	}
	/**
	 * @param {String} provider The music provider you want to use, can be: youtube for list of YouTube links, youtube_ids for list of YouTube video IDs, or spotify for list of Spotify IDs
	 * @param {Array<String> | String} tracks The list of tracks you want to get recommendations for. Can be an array or a new line seperated string or a comma seperated string.
	 * @return {Promise<recommendationsResponse>}
	 */

	async recommendations(provider, tracks) {
		if (!provider || !tracks)
			throw new Error(
				'[Ksoft API] Please specify the provider and tracks parameters'
			);
		const allowedProviders = ['youtube_ids', 'youtube', 'spotify'];
		if (!allowedProviders.some(item => item === provider))
			throw new Error(
				'[Ksoft API] Please specify the correct provider. Options: youtube_ids, youtube, or spotify'
			);
		if (typeof tracks === 'object') {
			if (tracks.length < 1)
				throw new Error('[Ksoft API] Please provide a track to search');
			if (tracks.length > 5)
				throw new Error(
					'[Ksoft API] Please provide less than or equal to 5 tracks'
				);
		}
		if (tracks.slice('').some(item => item === ',')) {
			const trackArray = tracks.slice(',');
			if (trackArray.length < 1)
				throw new Error('[Ksoft API] Please provide a track to search');
			if (trackArray.length > 5)
				throw new Error(
					'[Ksoft API] Please provide less than or equal to 5 tracks'
				);
		}
		if (tracks.slice('').some(item => item === '\n')) {
			const trackArray = tracks.slice('\n');
			if (trackArray.length < 1)
				throw new Error('[Ksoft API] Please provide a track to search');
			if (trackArray.length > 5)
				throw new Error(
					'[Ksoft API] Please provide less than or equal to 5 tracks'
				);
		}
		const res = await this.http.path('/music/recommendations').body({
			provider: provider,
			tracks: tracks
		});

		return res.json();
	}
};

module.exports = {
  music
};

/**
 * @typedef {Object} recommendationsResponse The response for music.recommendations
 * @prop {String} provider The music provider
 * @prop {Number} total The total number of responses
 * @prop {Array<track>} tracks The array of tracks. Please go to https://docs.ksoft.si/api/lyrics-api#music-recommendations for more info.
 */
