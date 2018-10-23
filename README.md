# ksoft.js
Official API Wrapper for [KSoft](https://docs.ksoft.si/api/) API, written in Node.js

## Getting Started

installing...
```
npm install ksoft.js --save
```

## Using the api examples
```javascript
// requiring and initiating
const Ksoft = require("ksoft.js");

const ksoft = new Ksoft("YourBrilliantToken")

// images api

// lets get a random meme :)
ksoft.images.getRandomMeme().then(result =>{
    // do whatever you want with the return data
})

// lets get a list of tags to use get images!
ksoft.images.getTags().then(result => {
    // do whatever you want with the return data
})

// lets get a random picture
ksoft.images.getRandomImage(tag).then(result=>{
    // do whatever you want with the return data
})

// There's more which will be listed near the bottom of this page but lets move on to the bans api
let banObject = {
    user: "123456789741" // Users Discord ID that you are banning/reporting
    mod: "123456789742" // Users Discord ID who posted/reported the ban
    user_name: "SomeBadUsername" // Users Discord username that you are banning/reporting
    user_discriminator: "#1234" // Users Discord discriminator that you are banning/reporting
    reason: "Your descriptive reason" // Reason why the user should be globally banned
    proof: "Your proof" // URL of the image showing the act
    appeal_possible: true/false // If appeal should be disabled for that user.
}

// Add a ban
ksoft.bans.add(banObject)

// Get info about a ban
ksoft.bans.getBanInfo(userID).then(result => { // userID is the user you want to get information about
    // do whatever you want with the response
})

// Check if a person is banned
ksoft.bans.check(userID).then(result => { // userID is the user you want to check
    // do whatever you want with the return data
})

// again there's more but lets move on to the kumo api

// lets get information about a location
ksoft.kumo.search(query,fast,more,mapZoom,includeMap).then(result => {
    // do whatever you want with the results
}) /* query is the location you want to get information about. Fast is whether you want to get the information fast but missing a little bit of information. More is if you want the api to return more than one location. mapZoom is how zoomed in you want the map (defaults to 12). IncludeMap is whether you want the map included in the results.*/

// lets get the weather for the place we just searched :)
ksoft.kumo.getSimpleWeather(reportType,q,units,lang,icons).then(result => {
    // do whatever you want with the result
}) /* the reportType is the weather report type. Can be one of: "currently", "minutely", "hourly", "daily". The q is the query, this is the location you want to get weather for. units is the unit type you can select from. Your options are: "si", "us", "uk2", "ca", or "auto". lang is the language you want the results to be in. Your options are: 'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'he', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ka', 'ko', 'kw', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin', 'zh', or 'zh-tw'. Finally icons is the icon pack you want to choose from. Defualts to original*/

// Again there's more but lets move on to the final api and the one that is my favorite, the lyrics api.

// lets search for a song
ksoft.lyrics.search(q,textOnly,limit).then(result => {
    // do whatever you want with the results
}) /* The q is the query you want to use such as: "Twenty one Pilots Jumpsuit". textOnly is whether you want the api to only search inside the lyrics. limit is how many responses you want it to return. */

// Lets get an artist by their id. You can get the id by searching for a song or an album or whatever.
ksoft.lyrics.getArtistById(id).then(result => {
    // do whatever you want with the results
})
/* All of the api's have jsdoc in them so if your using an editor such as Visual Studio Code (Which I highly recommend) it will give you more information about what you need to put into the paremeters and what exactly each function returns in detail.*/
```
## All functions

### Images Api
```javascript
ksoft.images.getRandomMeme()
```

```javascript
ksoft.images.getRandomImage(tag)
```

```javascript
ksoft.images.getTags()
```

```javascript
ksoft.images.searchTags(tag)
```

```javascript
ksoft.images.getImageFromId(snowflake)
```

```javascript
ksoft.images.getRandomWikiHow(nsfw)
```

```javascript
ksoft.images.getRandomCutePicture()
```

```javascript
ksoft.images.getRandomNSFW()
```

```javascript
ksoft.images.getRandomReddit(subReddit,removeNSFW,span)
```

### Bans Api

```javascript
ksoft.bans.add(banData)
```

```javascript
ksoft.bans.getBanInfo(userID)
```

```javascript
ksoft.bans.check(userID)
```

```javascript
ksoft.bans.list(page,perPage)
```

```javascript
ksoft.bans.getUpdate(epochDate)
```

### Kumo Api

```javascript
ksoft.kumo.search(q,fast,more,mapZoom,includeMap)
```

```javascript
ksoft.kumo.getSimpleWeather(reportType,q,units,lang,icons)
```

```javascript
ksoft.kumo.geoip(ip)
```

### Lyrics Api

```javascript
ksoft.lyrics.search(q,textOnly,limit)
```

```javascript
ksoft.lyrics.getArtistById(id)
```

```javascript
ksoft.lyrics.getAlbumById(id)
```

```javascript
ksoft.lyrics.getTrackById(id)
```


Special thanks to sdf for helping me troubleshoot some stuff :)
