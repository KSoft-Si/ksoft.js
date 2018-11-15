const { images } = require("./lib/apis/images")
const { bans } = require("./lib/apis/bans")
const { kumo } = require("./lib/apis/kumo")
const { lyrics } = require("./lib/apis/lyrics")
const Webhook = require("./lib/webhook/server")
/**
 * @typedef {Object} webhookOptions webhook options
 * @prop {Boolean} useWebhooks whether to use the webhook feature
 * @prop {number} port webhook http server port
 * @prop {String} Authentication Your webhook authentication
 */
class ksoftAPI{
    /**
     * @constructor
     * @param {number} token Your ksoft api token
     * @param {boolean} useWebhooks Whether you want to use the webhook feature
     * @param {webhookOptions} webhookOptions webhook options
     */
    constructor(token, webhookOptions){
       /**
        * The webhook class if useWebhooks is true
        * @type {Webhook?}
        */
        this.webhook = null
        if(webhookOptions.useWebhooks){
            this.webhook = new Webhook(webhookOptions.port, webhookOptions.Authentication)
        }
        this.images = new images(token)
        this.bans = new bans(token)
        this.kumo = new kumo(token)
        this.lyrics = new lyrics(token)
    }

}

module.exports = ksoftAPI