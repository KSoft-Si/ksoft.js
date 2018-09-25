const request = require('request-promise-native')
const { Meme, Bans, Kumo, Lyrics } = require('./endpoints/')

module.exports = class Client {
  /**
   *
   * @param {String} key - Your KSoft-Si API key. You can get one through https://api.ksoft.si/dashboard/
   * @param {String} [baseUrl] - Base URL for the API.
   * @param {String} [cdnUrl] - CDN URL for the API.
   */
  constructor (key, baseUrl = 'https://api.ksoft.si', cdnUrl = 'https://cdn.ksoft.si') {
    this.key = key
    this.baseUrl = baseUrl
    this.cdnUrl = cdnUrl
  }

  /**
   * Performs a GET request with the Client's API key
   * @param {String} endpoint - The endpoint to perform the request to
   * @returns {Promise} - Request promise
   */
  get (endpoint) {
    return request.get({
      url: `${this.baseUrl}/${endpoint}`,
      headers: {
        'Authorization': `Token ${this.key}`
      },
      json: true
    })
  }

  /**
   * Performs a POST request with the Client's API key
   * @param {String} endpoint - The endpoint to perform the request to
   * @returns {Promise} - Request promise
   */
  post (endpoint) {
    return request.post({
      url: `${this.baseUrl}/${endpoint}`,
      headers: {
        'Authorization': `Token ${this.key}`
      },
      json: true
    })
  }

  /**
   * Performs a POST request with the Client's API key and form body
   * @param {String} endpoint - The endpoint to perform the request to
   * @param {object} formData - Form data to send
   * @returns {Promise} - Request promise
   */
  postWithFormData (endpoint, formData = {}) {
    return request.post({
      url: `${this.baseUrl}/${endpoint}`,
      formData,
      headers: {
        'Authorization': `Token ${this.key}`
      },
      json: true
    })
  }

  /**
   * Performs a DELETE request with the Client's API key
   * @param {String} endpoint - The endpoint to perform the request to
   * @returns {Promise} - Request promise
   */
  delete (endpoint) {
    return request.post({
      url: `${this.baseUrl}/${endpoint}`,
      headers: {
        'Authorization': `Token ${this.key}`
      },
      json: true
    })
  }

  meme = Meme
  bans = Bans
  kumo = Kumo
  lyrics = Lyrics
}
