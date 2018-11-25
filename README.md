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

Note: When you see a paremeter like this: (value: DataType) I am just defining the type of value it takes. That does not mean it's an object. If it has {} around it then it is an object.

## All functions

### Images Api

```javascript
ksoft.images.getRandomMeme();
```

```javascript
ksoft.images.getRandomImage(tag: String);
```

```javascript
ksoft.images.getTags();
```

```javascript
ksoft.images.searchTags(tag: String);
```

```javascript
ksoft.images.getImageFromId(snowflake: String);
```

```javascript
ksoft.images.getRandomWikiHow(nsfw: Boolean);
```

```javascript
ksoft.images.getRandomCutePicture();
```

```javascript
ksoft.images.getRandomNSFW();
```

```javascript
ksoft.images.getRandomReddit(subReddit: String, removeNSFW: Boolean, span: String); //span is how far back you wanna go into the past to find a post
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
ksoft.bans.getBanInfo(userID: String);
```

```javascript
ksoft.bans.check(userID: String);
```

```javascript
ksoft.bans.list(page: Number, perPage: Number);
```

```javascript
ksoft.bans.getUpdate(epochDate: String);
```

advancedBannedOnly is a special option I added that will read through all of the ids given and filter out the people that aren't banned and will only return the ones that are banned. It will also return their whole ban object. It will throw an error if there are no people banned in the list. Use .catch() if you want to handle the error.

```javascript
ksoft.bans.bulkCheck(ids, {
	moreInfo: Boolean,
	bannedOnly: Boolean,
	advancedBannedOnly: Boolean, // this can only be used by itself
});
```

```javascript
ksoft.bans.guildMembersCheck(guildMemberCollection, {
	// The guildMemberCollection is the discord.js guildMemberCollection that I can go through and check to see if they are banned
	moreInfo: Boolean,
	ignoreBots: Boolean,
});
```

### Kumo Api

```javascript
ksoft.kumo.search(query: String, {
	fast: Boolean,
	more: Boolean,
	mapZoom: Number,
	includeMap: Boolean,
});
```

```javascript
ksoft.kumo.getSimpleWeather(reportType: String, query: String, units: String, lang: String, icons: String);
```

```javascript
ksoft.kumo.geoip(ip: String);
```

```javascript
ksoft.kumo.convertCurrency(from: String, to: String, value: Number); // From and to are the type of currency you are converting. And value is the value you are converting. (ex: ksoft.kumo.convertCurrency("usd", "eur", 100).then(res => {"value": 88.6129, "pretty": "88.61 EUR"}))
```

### Lyrics Api

```javascript
ksoft.lyrics.search(query: String, {
	textOnly: Boolean,
	limit: Number,
});
```

```javascript
ksoft.lyrics.getArtistById(id: Number);
```

```javascript
ksoft.lyrics.getAlbumById(id: Number);
```

```javascript
ksoft.lyrics.getTrackById(id: Number);
```

voiceConnection is the discord.js voiceConnection object you get when you connect to a voice channel. This command will search both youtube and the api for a song and if you provide a voice channel connection it will start playing the song and in the promise return the lyrics. This isn't 100% accurate so use at your own risk.

```javascript
ksoft.lyrics.searchAndPlay(query: String, voiceConnection);
```

## Webhook feature

This just requires adding a few things when we initiate ksoft.js

```javascript
const Ksoft = require('ksoft.js');
const ksoft = new Ksoft('your ksoft token', {
	useWebhooks: true,
	port: 2000, // this is the port the http server is going to run on. This can be whatever port you want I am just using 2000 as an example
	authentication: 'your webhook authentication token',
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
	.setUserID('1234567892355822') // required
	.setModID('44457845784574578')
	.setUserName('blahblahblah')
	.setUserDiscriminator('1234')
	.setReason('testing123') // required
	.setProof('proof') // required
	.isAppealable(true);

ksoft.bans.add(ban).then(res => {
	console.log(res); // { success: true}
});
```

Special thanks to sdf for helping me troubleshoot some stuff :)
