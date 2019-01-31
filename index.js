const { images } = require('./lib/apis/images');
const { bans } = require('./lib/apis/bans');
const { kumo } = require('./lib/apis/kumo');
const { lyrics } = require('./lib/apis/lyrics');
const music = require('./lib/apis/music');
const BanCreator = require('./lib/util/banCreator');
const Webhook = require('./lib/webhook/server');
/**
 * @typedef {Object} webhookOptions webhook options
 * @prop {Boolean} useWebhooks whether to use the webhook feature
 * @prop {number} port webhook http server port
 * @prop {String} authentication Your webhook authentication
 */
class KsoftAPI {
	/**
	 * @constructor
	 * @param {String} token Your ksoft api token
	 * @param {webhookOptions} [webhookOptions] Only needed if you are using webhooks
	 */
	constructor(token, webhookOptions) {
		/**
		 * The webhook class if useWebhooks is true
		 * @type {Webhook?}
		 */
		if(typeof token !== "string") throw new Error("[Ksoft API] Please make sure your token is a string");
		this.webhook = null;
		if (webhookOptions) {
			if (webhookOptions.useWebhooks) {
				this.webhook = new Webhook(webhookOptions.port, webhookOptions.authentication);
			}
		}
		this.images = new images(token);
		this.bans = new bans(token);
		this.kumo = new kumo(token);
		this.lyrics = new lyrics(token);
		this.music = new music(token);
		this.CreateBan = BanCreator;
	}
}

module.exports = KsoftAPI;
