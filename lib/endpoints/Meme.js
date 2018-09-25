const { Client } = require('../Client')
const client = new Client()

module.exports = class Meme {
  /**
   * Gets a random meme
   * @returns {Promise} - Request promise
   */
  static getRandomMeme () {
    return client.get('meme/random-image')
  }
}
