const { images } = require("./lib/apis/images")
const { bans } = require("./lib/apis/bans")
const ksoftAPI = class ksoftAPI {
    constructor(token){
        this.images = new images(token)
        this.bans = new bans(token)
        
    }

}

module.exports = {
    ksoftAPI
}