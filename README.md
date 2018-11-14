# ksoft.js
Official API Wrapper for [KSoft](https://docs.ksoft.si/api/) API, written in Node.js

## Getting Started

installing...
```
npm install ksoft.js --save
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
ksoft.images.getRandomReddit({subReddit,removeNSFW,span})
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
ksoft.kumo.search(q, {
    fast: Boolean,
    more: Boolean,
    mapZoom: Number,
    includeMap: Boolean
})
```

```javascript
ksoft.kumo.getSimpleWeather(reportType,q,units,lang,icons)
```

```javascript
ksoft.kumo.geoip(ip)
```

```javascript
ksoft.kumo.convertCurrency(from,to,value)
```

### Lyrics Api

```javascript
ksoft.lyrics.search(q, {
    textOnly: Boolean,
    limit: Number
})
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
