const Image = require('./Image');
const WikiHowArticle = require('./WikiHowArticle');

class WikiHowImage extends Image {
	constructor({ url, title, nsfw, article_url }) {
		super({ url, nsfw, tag: 'wikihow' });
		this.article = new WikiHowArticle({ title, link: article_url });
	}
}

module.exports = WikiHowImage;