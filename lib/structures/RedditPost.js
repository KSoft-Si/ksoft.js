class RedditPost {

	constructor({ title, subreddit, link, upvotes, downvotes, author, comments, awards }) {
		this.title = title;
		this.subreddit = subreddit;
		this.link = link;
		this.upvotes = upvotes;
		this.downvotes = downvotes;
		this.author = author;
		this.comments = comments;
		this.awards = awards;
	}

}

module.exports = RedditPost;
