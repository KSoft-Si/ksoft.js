const { images } = require("./lib/apis/images")
const { bans } = require("./lib/apis/bans")
const { kumo } = require("./lib/apis/kumo")
const { lyrics } = require("./lib/apis/lyrics")
const ksoftAPI = class ksoftAPI {
    constructor(token){
        this.images = new images(token)
        this.bans = new bans(token)
        this.kumo = new kumo(token)
        this.lyrics = new lyrics(token)
    }

}

module.exports = ksoftAPI