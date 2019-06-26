# ksoft.js

Cleaner fork of the official API Wrapper for the [KSoft](https://docs.ksoft.si/api/) API, written in Node.js

## Getting Started

```
npm i aerodiscord/ksoft.js#tazio // (run again to update)
```

```javascript
const { KsoftAPIClient } = require('ksoft.js');
const ksoft = new KsoftAPIClient(token, options); 
```

```js
// possible options:
{
	useWebhooks: false, 	// Boolean	whether to run a webhook listener
	port: null, 			// Number	this is the port the http server is going to run on. 
	authentication: null 	// String 	your webhook authentication token
}

```

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
	appeal_possible: Boolean
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
	advancedBannedOnly: Boolean // this can only be used by itself
});
```

```javascript
ksoft.bans.guildMembersCheck(guildMembers: Collection, {
	// guildMembers is a discord.js GuildMemberStore (extends d.js#Collection)
	moreInfo: Boolean,
	ignoreBots: Boolean
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
ksoft.kumo.getAdvancedWeather(latitude: Number, longitude: Number, reportType: String, units: String, lang: String, icons: String)
```

```javascript
ksoft.kumo.geoip(ip: String);
```

```javascript
ksoft.kumo.convertCurrency(from: String, to: String, value: Number); 
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

```

### Music api

```javascript
ksoft.music.recommendations(provider: String, tracks: String | Array<String>)
```

## Webhook feature

```javascript
const Ksoft = require('ksoft.js');
// possible events: info, ban, unBan, vote. see https://docs.ksoft.si/api/webhooks

ksoft.on('ban', ban => {
	console.log(ban.id);
});
```

## Using the BanCreator utility

```javascript
const { Ban } = require('ksoft.js');
const ban = new Ban()
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
