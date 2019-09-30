# ksoft.js

# Documentation WIP.

This is the official Node.js Wrapper for the KSoft.Si API.

## Usage

**All API calls are async. You have to put them into an async function, and await them. Else, they will return a Promise.**

Example:
```js
const { KSoftClient } = require('ksoft.js');

const ksoft = new KSoftClient('your-very-nice-token');

async function test () {
	const aww = await ksoft.images.aww();
	message.send(aww.url);
}

test();
```

## Ban Builder

For `ksoft.bans.add`, I have included a ban builder, which makes it considerably easier to send a ban request to KSoft.

API:

```ts
ban.setUser(id: Snowflake, name: String, discriminator: String);
ban.setReason(reason: String, proof: URL);
ban.setModerator(id: Snowflake);
```

Example:

```js
const { Ban, KSoftClient } = require('ksoft.js');

const ksoft = new KSoftClient('your-very-nice-token');
const ban = new Ban()
	.setUser('123456789123456789', 'Wumpus', '0001')
	.setReason('Bad Raider', 'https://i.imgur.com/ban_em_already')
	.setModerator('102102717165506560');

ksoft.bans.add(ban);
```


## APIs

### Bans

#### Add Ban
```ts
ksoft.bans.add(ban: Ban);
```

Response:
```js
Promise<{ success: true } | {success: false, message: '[error that occured]'}>
```
---

#### Get Ban Info
```ts
ksoft.bans.info(id: Snowflake);
```

Response:
```js
Promise<Ban>
```
---