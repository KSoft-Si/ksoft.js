const fetch = require('centra');
const { readdirSync } = require('fs');
const { join } = require('path');
const { EventEmitter } = require('events');

const Ban = require('./lib/util/Ban');
const Webhook = require('./lib/webhook/server');

/**
 * @typedef {Object} webhookOptions webhook options
 * @prop {Boolean} useWebhooks wheher to use the webhook feature
 * @prop {number} port webhook http server port
 * @prop {String} authentication Your webhook authentication
 */
class KsoftAPI extends EventEmitter {

	/**
	 * @constructor
	 * @param {String} token Your KSoft API token
	 * @param {webhookOptions} [webhookOptions] Only needed if you are using webhooks
	 */
	constructor(token, options = {}) {
		super();

		this.token = token;
		this.baseURL = 'https://api.ksoft.si';
		this.apiStore = join(process.cwd(), 'lib', 'apis');

		/**
		 * The webhook class if useWebhooks is true
		 * @type {Webhook?}
		 */
		if (typeof token !== 'string') { throw new TypeError('[KSoft API] Please make sure your token is a string'); }
		this.webhook = null;
		if (options.useWebhooks) {
			this.webhook = new Webhook(
				options.port,
				options.authentication
			);
		}

		this._apis = readdirSync(this.apiStore).map(i => i.replace('.js', ''));
		this.api = fetch(this.baseURL).header('Authorization', `Bearer ${this.token}`);
	}

}

const handler = {
	get: function (obj, prop) {
		if (obj._apis.includes(prop)) {
			return require(join(this.apiStore), prop)(this);
		} else {
			throw new SyntaxError(`[KSoft API] ${prop} is not a valid API path.`);
		}
	}
};

const KsoftAPIClient = new Proxy(KsoftAPI, handler);

module.exports = { KsoftAPIClient, Ban };
