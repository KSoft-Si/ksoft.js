const fetch = require('centra');

class lyrics {
	constructor(token) {
		/** @access private*/
		this.token = token;
		/** @access private*/
		this.baseURL = 'https://api.ksoft.si';
		/** @access private*/
		this.http = fetch(this.baseURL).header(
			'Authorization',
			`Bearer ${this.token}`
		);
		/** @access private*/
		this.cache = new Map();
	}
	/**
	 * @param {String} q The search query for lyrics
	 * @param {searchOptions} options The options for lyrics.search
	 * @returns {Promise<searchResponse>} information about the search query and songs
	 */
	async search(q, options) {
		if (!q) throw new Error('[Ksoft API] Please define a search query');
		if (this.cache.has(q)) return this.cache.get(q);
		const params = { q };
		if (options.textOnly) params.text_only = options.textOnly;
		if (options.limit) params.limit = options.limit;
		if (options.cleanUp) params.clean_up = options.cleanUp;
		const res = await this.http.path('/').query(params);
		this.cache.set(q, res.json());
		return res.json();
	}
	/**
	 * @param {Number} id The artist id you want to search for
	 * @returns {Promise<getArtistByIdResults>} Information about the artist
	 */
	async getArtistById(id) {
		if (!id) throw new Error('[Ksoft API] Please define an id');
		if (this.cache.has(id)) return this.cache.get(id);
		const res = await this.http.path(`/lyrics/artist/${id}/`);
		this.cache.set(id, res.json());
		return res.json();
	}
	/**
	 * @param {Number} id ID of the album
	 * @returns {Promise<getAlbumByIdResponse>} Information about the album
	 */
	async getAlbumById(id) {
		if (!id) throw new Error('[Ksoft API] Please define an id');
		if (this.cache.has(id)) return this.cache.get(id);
		const res = await this.http.path(`/lyrics/album/${id}/`);
		this.cache.set(id, res.json());
		return res.json();
	}
	/**
	 * @param {Number} id The track id that you want to search
	 * @returns {Promise<getTrackByIdResults>} Information about the track
	 */
	async getTrackById(id) {
		if (!id) throw new Error('[Ksoft API] Please define an id');
		if (this.cache.has(id)) return this.cache.get(id);
		const res = await this.http.path(`/lyrics/track/${id}/`);
		this.cache.set(id, res.json());
		return res.json();
	}

	/**
	 * Caution! This is not always accurate. It may play the right song but not return the right lyrics or vice versa. Use at your own risk.
	 * @param {String} query The search query you want to use in the search
	 * @param {DiscordVoiceChannelConnection} voiceChannelConnection The Discord voice channel connection you get after connecting to the channel
	 * @param {Boolean} returnAvancedResponse Whether or not you want the full response in the promise. This is useful for checking the responses to make sure it is returning the right lyrics
	 * @returns {Promise<advancedResponse>}
	 */
	async searchAndPlay(query, voiceChannelConnection) {
		let ytdl = null;
		try {
			ytdl = require('ytdl-core');
		} catch (e) {
			throw new Error('ytdl-core is required for playing music');
		}

		if (!query) throw new Error('[Ksoft API] Please provide a search query');
		const youtubeResult = await require('../util/searchYoutube')(query);
		const songInfo = await this.search(youtubeResult[0].title, {
			cleanUp: true
		});
		if (voiceChannelConnection) {
			(voiceChannelConnection.playStream || voiceChannelConnection.play)(
				ytdl(youtubeResult[0].url, { filter: 'audioonly' })
			);
		}

		const advancedResponse = {
			youtubeResult: youtubeResult[0],
			apiResponse: songInfo.data[0]
		};

		return advancedResponse;
	}
};
module.exports = {
	lyrics
};
/**
 * @typedef {Object} searchData The data for searchResponse
 * @prop {String} artist The artist of the song
 * @prop {Number} artist_id The artist id (you can use this in other endpoints)
 * @prop {String} album Comma seperated list of album names
 * @prop {String} album_ids Comma seperated list of album id's (you can use this in other endpoints)
 * @prop {String} album_year Comma seperated list of album years
 * @prop {String} name The name of the song
 * @prop {String} lyrics Formatted lyrics
 * @prop {String} search_str Full title
 * @prop {String} album_art Url to the album art
 * @prop {String} id The id of the song
 * @prop {Number} search_score How sure the api is that it was correct
 *
 * @typedef {Object} searchResponse the response of lyrics.search
 * @prop {Number} total The total songs in the api
 * @prop {Number} took How long it took to find the songs
 * @prop {Array<searchData>} data An array of objects with the song data.
 *
 * @typedef {Object} simpleAlbum Simple album data
 * @prop {Number} id album id
 * @prop {String} name The album name
 * @prop {Number} album_year The album year
 *
 * @typedef {Object} simpleTrack
 * @prop {Number} id Track id
 * @prop {String} name Track name
 *
 * @typedef {Object} getArtistByIdResults The results for lyrics.getArtistById
 * @prop {Number} id The artist id
 * @prop {String} name The name of the artist
 * @prop {Array<simpleAlbum>} albums Array of albums
 * @prop {Array<simpleTrack>} tracks Array of tracks
 *
 * @typedef {Object} Artist The artist data for getAlbumByIdRespnse
 * @prop {Number} id The id of the artist
 * @prop {String} name The name of the artist
 *
 * @typedef {Object} getAlbumByIdResponse The response for lyrics.getAlbumById
 * @prop {Number} id The id of the album
 * @prop {String} name The name of the album
 * @prop {Artist} artist The artist of the album
 * @prop {Array<simpleTrack>} tracks an array of tracks in the album
 *
 * @typedef {Object} Album The album results for getTrackByIdResults
 * @prop {Number} id The id of the album
 * @prop {String} name The name of the album
 * @prop {Number} year The year the album was made
 *
 * @typedef {Object} getTrackByIdResults The results for lyrics.getTrackById
 * @prop {String} name The name of the song
 * @prop {Artist} artist The artist of the song
 * @prop {Array<Album>} albums Albums the song shows up in
 * @prop {String} lyrics The lyrics for the song
 *
 * @typedef {Object} searchOptions
 * @prop {Boolean} textOnly Default: false, if set to 'true' then it only searches inside the lyrics.
 * @prop {Number} limit Default: 10, how many results should the endpoint return.
 * @prop {Boolean} cleanUp Whether or not to clean up the search query (good for youtube title searches)
 *
 * @typedef {Object} youtubeResult
 * @prop {String} url The url of the video
 * @prop {String} thumbnail The thumbnail for the video
 * @prop {String} duration The duration of the video
 * @prop {String} title The title of the video
 * @prop {String} channel The name of the youtube channel
 * @prop {String} published When the video was published
 * @prop {String} views How many views the video has
 *
 * @typedef {Object} searchAndPlayResponse
 * @prop {youtubeResult} youtubeResult The result of the youtube search
 * @prop {searchResponse} apiResponse The response from the lyrics api
 */
