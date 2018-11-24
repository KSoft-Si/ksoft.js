# ksoft.js

Official API Wrapper for [KSoft](https://docs.ksoft.si/api/) API, written in Node.js

## Getting Started

installing...

```
npm install ksoft.js --save
```

initializing...

```javascript
const Ksoft = require('ksoft.js');
const ksoft = new Ksoft(yourtoken, webhookOptions); // webhook options will be reviewed below
```

## All functions

### Images Api

```javascript
ksoft.images.getRandomMeme();
```

```javascript
ksoft.images.getRandomImage(tag);
```

```javascript
ksoft.images.getTags();
```

```javascript
ksoft.images.searchTags(tag);
```

```javascript
ksoft.images.getImageFromId(snowflake);
```

```javascript
ksoft.images.getRandomWikiHow(nsfw);
```

```javascript
ksoft.images.getRandomCutePicture();
```

```javascript
ksoft.images.getRandomNSFW();
```

```javascript
ksoft.images.getRandomReddit(subReddit, removeNSFW, span);
```

### Bans Api

```javascript
ksoft.bans.add({
	user: String,
	mod: String,
	user_name: String,
	user_discriminator: String,
	reason: String,
	proof: String,
	appeal_possible: Boolean,
});
```

```javascript
ksoft.bans.getBanInfo(userID);
```

```javascript
ksoft.bans.check(userID);
```

```javascript
ksoft.bans.list(page, perPage);
```

```javascript
ksoft.bans.getUpdate(epochDate);
```

```javascript
ksoft.bans.bulkCheck(ids, {
	moreInfo: Boolean,
	bannedOnly: Boolean,
	advancedBannedOnly: Boolean, // this can only be used by itself
});
```

```javascript
ksoft.bans.guildMembersCheck(guildMemberCollection, {
	moreInfo: Boolean,
	ignoreBots: Boolean,
});
```

### Kumo Api

```javascript
ksoft.kumo.search(q, {
	fast: Boolean,
	more: Boolean,
	mapZoom: Number,
	includeMap: Boolean,
});
```

```javascript
ksoft.kumo.getSimpleWeather(reportType, q, units, lang, icons);
```

```javascript
ksoft.kumo.geoip(ip);
```

```javascript
ksoft.kumo.convertCurrency(from, to, value);
```

### Lyrics Api

```javascript
ksoft.lyrics.search(q, {
	textOnly: Boolean,
	limit: Number,
});
```

```javascript
ksoft.lyrics.getArtistById(id);
```

```javascript
ksoft.lyrics.getAlbumById(id);
```

```javascript
ksoft.lyrics.getTrackById(id);
```

voiceConnection is the discord.js voiceConnection object you get when you connect to a voice channel. This command will search both youtube and the api for a song and if you provide a voice channel connection it will start playing the song and in the promise return the lyrics. This isn't 100% accurate so use at your own risk.

```javascript
ksoft.lyrics.searchAndPlay(query, voiceConnection);
```

## Webhook feature

This just requires adding a few things when we initiate ksoft.js

```javascript
const Ksoft = require('ksoft.js');
const ksoft = new Ksoft('your ksoft token', {
	useWebhooks: true,
	port: 2000, // this is the port the http server is going to run on. This can be whatever port you want I am just using 2000 as an example
	Authentication: 'your webhook authentication token',
});

ksoft.webhook.on('ready', info => {
	console.log(info); // this will return the host your http server is running on. This is what you will give to ksoft to send the info to. { "host": "yourpublicip:theportyouspecified"}
});
```

that was just to get everything up and running now let's see how we can actually access that data. It's really simple :)

```javascript
// this is an extension of the previous example. Everything works on events so you can simply do this

ksoft.webhook.on('ban', banData => {
	console.log(banData); // there you simply get the banInfo sent from ksoft. All the event names are the same as on the ksoft documentation so if you want more info just go to https://docs.ksoft.si/api/webhooks
});
```

## Using the BanCreator utility

```javascript
// the ksoft variable I am using is the initialized Ksoft class
const ban = new ksoft.CreateBan()
	.setUserID('1234567892355822') // this is required
	.setModID('44457845784574578')
	.setUserName('blahblahblah')
	.setUserDiscriminator('1234')
	.setReason('testing123') // also required
	.setProof('proof') // this is also required
	.isAppealable(true);

ksoft.bans.add(ban).then(res => {
	console.log(res); // { success: true}
});
```

Special thanks to sdf for helping me troubleshoot some stuff :)
