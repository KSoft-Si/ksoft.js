const EventEmitter = require('events');
const Vaxic = require('vaxic');
const fetch = require('centra');
const app = new Vaxic();
class Webhook extends EventEmitter {
	/**
	 * @constructor webhook constructor
	 * @param {number} port The port you want the server to run on
	 * @param {String} token your KSoft API webhook authentication
	 */
	constructor(port, authentication) {
		super();
		/** @access private*/
		this.port = port;
		/** @access private*/
		this.auth = authentication;
		if (!port) throw new Error('please specify a port');
		this.start();
	}
	/** @access private*/
	async start() {
		app.add('POST', (req, res) => {
			const auth = req.headers.authorization;
			if (auth !== this.auth) {
				res.writeHead(403, 'Unauthorized!');
				res.end('Authorization headers do not match!');
				return;
			}
			const { event, event_data } = JSON.parse(req.body.toString());
			this.emit(event, event_data);
			res.writeHead(200, 'Success!');
			res.end();
		});

		app.listen(this.port);
	}
}

module.exports = Webhook;
