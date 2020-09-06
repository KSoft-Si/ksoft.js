const Connection = require('./Connection');

class DeezerConnection extends Connection {

	constructor(...args) {
		super(...args);

		this.type = 'deezer';
	}

}

module.exports = DeezerConnection;
