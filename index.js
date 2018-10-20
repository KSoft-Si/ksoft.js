const { images } = require("./lib/apis/images")

const ksoftAPI = class ksoftAPI {
    constructor(token){
        this.images = new images(token)
    }

}

module.exports = {
    ksoftAPI
}