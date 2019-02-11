const fetch = require('centra');

class images {
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
	}
	/**
	 * Gets random meme from KSoft
	 * @returns {Promise<getRandomMemeResponse>} Information for random meme
	 */
	getRandomMeme() {
    return this.http.path('/images/random-meme')
      .send()
      .then(res => res.json());
	}
	/**
	 * Gets random image from KSoft
	 * @param {String} tag tag for image
	 * @returns {Promise<getRandomImageResponse>} Information for random image
	 */
	async getRandomImage(tag) {
		try {
			if (!tag) throw new Error('[Ksoft API] No tag found');
			const res = await this.http
				.path('/images/random-image')
				.query('tag', tag)
				.send();
			return res.json();
		} catch (err) {
			console.error(err);
		}
	}
	/**
	 * @returns {Promise<getTagsResponse>} List of tags
	 */
	async getTags() {
		try {
			const res = await this.http.path('/images/tags').send();
			return res.json();
		} catch (err) {
			console.error(err);
		}
	}
	/**
	 * @param {String} query Query for tags
	 * @returns {Promise<searchTagsResponse>} Information about the specified tag
	 */
	async searchTags(query) {
		if (!query) throw new Error('[Ksoft API] Please define a search query');
		try {
			const res = await this.http
				.path(`/images/tags/${encodeURIComponent(query)}`)
				.send();
			return res.json();
		} catch (err) {
			console.error(err);
		}
	}
	/**
	 * @param {String} snowflake The url of the image you want to get
	 * @returns {Promise<getImageFromIdResponse>} Information about the specified image
	 */
	async getImageFromId(snowflake) {
		if (!snowflake)
			throw new Error('[Ksoft API] Please define a unique image id');
		try {
			const res = await this.http.path(
				`/images/image/${encodeURIComponent(snowflake)}`
			);
			return res.json();
		} catch (err) {
			console.error(err);
		}
	}
	/**
	 * @param {Boolean} nsfw Whether you want to allow nsfw content
	 * @returns {Promise<getRandomWikiHowResponse>} Image and article information
	 */
	async getRandomWikiHow(nsfw) {
		const res = await this.http
			.path('/images/random-wikihow')
			.query('nsfw', nsfw ? true : false)
			.send();

		return res.json();
	}
	/**
	 * @returns {Promise<getRandomCutePictueResponse>} Information about the cute picture
	 */
	async getRandomCutePictue() {
		try {
			const res = await this.http.path('/images/random-aww').send();
			return res.json();
		} catch (err) {
			console.error(err);
		}
	}
	/**
	 * @param {Boolean} gif Whether this should be a gif or not
	 * @returns {Promise<getRandomNSFWResponse>} Information about the nsfw picture
	 */
	async getRandomNSFW(gif) {
		const res = await this.http
			.path('/images/random-nsfw')
			.query('gif', gif ? true : false)
			.send();
		return res.json();
	}
	/**
	 * @param {String} subReddit Specified subreddit
	 * @param {String} span Default: "day", select range from which to get the images. Can be one of the following: "hour", "day", "week", "month", "year", "all"
	 * @param {Boolean} removeNSFW Whether to remove nsfw content or not
	 * @returns {Promise<getRandomRedditResponse>}
	 */
	async getRandomReddit(subReddit, span, removeNSFW) {
		if (!subReddit) throw new Error('Please specify a subreddit');
		const params = {};
		if (span) params.span = span;
		if (removeNSFW) params.remove_nsfw = removeNSFW;

		const res = await this.http
			.path('/images/rand-reddit')
			.query(params)
			.send();

		return res.json();
	}
};

module.exports = {
	images
};
/**
 * @typedef {Object} getRandomImageResponse The response for images.getRandomMeme
 * @prop {String} url The url of the image
 * @prop {String} snowflake The snowflake for the image
 * @prop {Boolean} nsfw Whether the image is NSFW
 * @prop {String} tag The tag for the image
 *
 * @typedef {Object} getRandomMemeResponse The response for images.getRandomMeme
 * @prop {String} title The title of the meme
 * @prop {String} image_url The url for the image of the meme
 * @prop {String} source The source of the meme
 * @prop {String} subreddit The subreddit the meme came from
 * @prop {Number} upvotes The amount of upvotes on the meme
 * @prop {Number} downvotes How many downvotes are on the meme
 * @prop {Number} comments How many comments are on this meme
 * @prop {Number} created_at Epoch date for the time the meme was created
 * @prop {Boolean} nsfw Whether this meme is nsfw
 * @prop {String} author The author of the meme
 *
 * @typedef {Object} tag
 * @prop {String} name The name of the tag
 * @prop {Boolean} nsfw Whether this tag is nsfw
 *
 * @typedef {Object} getTagsResponse The response for images.getTags
 * @prop {Array<tag>} models Array of tags
 * @prop {Array<String>} tags List of non-nsfw tags
 * @prop {Array<String>} nsfw_tags List of nsfw tags
 *
 * @typedef {Object} searchTagsResponse The response  for images.searchTags
 * @prop {Array<tag>} models The tag object in array form
 * @prop {Array<String>} tags The tag name in array form
 *
 * @typedef {Object} getImageFromIdResponse The response for images.getImageFromId
 * @prop {String} url The url of the image
 * @prop {String} snowflake The snowflake for the image
 * @prop {Boolean} nsfw Whether the image is NSFW
 * @prop {String} tag The tag for the image
 *
 * @typedef {Object} getRandomWikiHowResponse The response for images.getRandomWikiHow
 * @prop {String} url The url of the image
 * @prop {String} title The title of the post
 * @prop {Boolean} nsfw Whether the image is NSFW
 * @prop {String} article_url The url of the article
 *
 * @typedef {Object} getRandomCutePictueResponse The response for images.getRandomCutePicture
 * @prop {String} title The title of the cute picture
 * @prop {String} image_url The url for the image of the cute picture
 * @prop {String} source The source of the cute picture
 * @prop {String} subreddit The subreddit the cute picture came from
 * @prop {Number} upvotes The amount of upvotes on the cute picture
 * @prop {Number} downvotes How many downvotes are on the cute picture
 * @prop {Number} comments How many comments are on this cute picture
 * @prop {Number} created_at Epoch date for the time the cute picture was created
 * @prop {Boolean} nsfw Whether this picture is nsfw
 * @prop {String} author The author of the cute picture
 *
 * @typedef {Object} getRandomNSFWResponse The response for images.getRandomNSFW
 * @prop {String} title The title of the nsfw picture
 * @prop {String} image_url The url for the image of the nsfw picture
 * @prop {String} source The source of the nsfw picture
 * @prop {String} subreddit The subreddit the nsfw picture came from
 * @prop {Number} upvotes The amount of upvotes on the nsfw picture
 * @prop {Number} downvotes How many downvotes are on the nsfw picture
 * @prop {Number} comments How many comments are on this nsfw picture
 * @prop {Number} created_at Epoch date for the time the nsfw picture was created
 * @prop {Boolean} nsfw Whether this picture is nsfw
 * @prop {String} author The author of the nsfw picture
 *
 * @typedef {Object} getRandomRedditResponse The response for images.getRandomReddit
 * @prop {String} title The title of the reddit post
 * @prop {String} image_url The url for the image of the reddit post
 * @prop {String} source The source of the reddit post
 * @prop {String} subreddit The subreddit the reddit post came from
 * @prop {Number} upvotes The amount of upvotes on the reddit post
 * @prop {Number} downvotes How many downvotes are on the reddit post
 * @prop {Number} comments How many comments are on this reddit post
 * @prop {Number} created_at Epoch date for the time the reddit post was created
 * @prop {Boolean} nsfw Whether this post is nsfw
 * @prop {String} author The author of the reddit post
 */
