const Tag = require('./Tag');

class Image {
	constructor({ url, snowflake, nsfw, tag }) {
		this.tag = tag ? new Tag(tag, nsfw) : null;
		this.url = url;
		this.id = snowflake || null;
	}
}

module.exports = Image;