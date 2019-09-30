const Endpoint = require('../../../lib/Endpoint');
const possibleProviders = ['spotify', 'youtube', 'youtube_ids', 'youtube_titles'];
const Suggestion = require('../../../lib/structures/Suggestion');

module.exports = class extends Endpoint {

	async run(provider, tracks, token, options = {}) {
		if (!provider) throw new SyntaxError('No provider');
		if (!possibleProviders.includes(provider)) throw new RangeError(`Invalid provider. Must be one of: ${possibleProviders.join(', ')}.`);
		if (!tracks || !Array.isArray(tracks) || !tracks.length) throw new SyntaxError('Invalid tracks');
		if (!token) throw new SyntaxError('A YouTube API token is required');
		const limit = options.limit || 5;
		return this.client.api.music.recommendations.post({ provider, tracks, youtube_token: token, limit });
	}

	async serialize(data) {
		return data.total > 0
			? data.tracks.map(track => Suggestion(track))
			: [];
	}
}