class RedditPost {
	constructor({ title, subreddit, link, upvotes, downvotes, author }) {
		this.title = title;
		this.subreddit = subreddit;
		this.link = link;
		this.upvotes = upvotes;
		this.downvotes = downvotes;
		this.author = author;
	}
}

module.exports = RedditPost;