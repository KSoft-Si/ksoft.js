const { images } = require("../lib/api's/images")

const ksoftAPI = class ksoftAPI {
    constructor(token){
        this.images = new images(token)
    }

}

module.exports = {
    ksoftAPI
}