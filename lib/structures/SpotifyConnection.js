const Connection = require('./Connection');

class SpotifyConnection extends Connection {

	constructor(...args) {
		super(...args);

		this.type = 'spotify';
	}

}

module.exports = SpotifyConnection;
