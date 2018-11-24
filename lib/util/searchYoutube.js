const { get } = require('axios');

const searchYoutube = async q => {
	const { data } = await get(`https://www.youtube.com/results?q=${encodeURIComponent(q)}&sp=EgIQAQ%253D%253D`);
	const body = data
		.toString()
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"');

	if (body.indexOf('No results for') !== -1) return [];

	const separator = '(?:a|[^a])+?';
	const regexArray = [
		'<div class="yt-lockup-thumbnail contains-addto">',
		separator,
		'href="(.+?)"',
		separator,
		'(?:data-thumb|src)="https://(.+?)"',
		separator,
		'<span class="video-time" aria-hidden="true">(.+?)</span>',
		separator,
		'dir="ltr">(.+?)</a>',
		separator,
		'data-sessionlink=".+?" >(.+?)</a>',
		separator,
		'<li>(.+?)</li><li>(.+?)</li>',
	];
	const dataRegex = new RegExp(regexArray.join(''), 'g');

	const results = [];
	let currentResult = null;

	while ((currentResult = dataRegex.exec(body)) !== null) {
		if (!/\/?v=.+/.exec(currentResult[1])) continue;

		results.push({
			url: `https://youtube.com${currentResult[1]}`,
			thumbnail: `https://${currentResult[2]}`,
			duration: currentResult[3],
			title: currentResult[4],
			channel: currentResult[5],
			published: currentResult[6],
			views: currentResult[7].slice(0, -6),
		});
	}

	return results;
};
module.exports = searchYoutube;
