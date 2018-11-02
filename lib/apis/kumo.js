/**
 * @typedef {Object} gisData data object for search function
 * @prop {String} address The address of the location
 * @prop {Number} lat the latitude of the location
 * @prop {Array<String>} bounding_box the bounding box for this location
 * @prop {Array<String>} type The type of location
 * @prop {String} map The map of the location
 * 
 * @typedef {Object} searchResponse the response for kumo.search (may not be exact due to option differences)
 * @prop {Boolean} error Whether there was an error or not
 * @prop {Number} code Response code
 * @prop {gisData} data The data for this location
 * 
 * @typedef getSimpleWeatherAlerts
 * @prop {String} title The title of the alert
 * @prop {Array<Strings>} regions The regions the alert is for 
 * @prop {String} severity The severity of the alert
 * @prop {Number} time The epoch time of the alert
 * @prop {Number} expires The epoch expiration date
 * @prop {String} description The description of the alert
 * @prop {String} uri The uri of the alert
 * 
 * @typedef {Object} getSimpleWeatherData data object for getSimpleWeather
 * @prop {String} time The time of the last update
 * @prop {String} summary The summary of the weather
 * @prop {String} icon The name of the icon
 * @prop {Number} precipIntensity The intensity of the precipitation
 * @prop {Number} precipProbability The probability of precipitation
 * @prop {Number} temperature The temperature
 * @prop {Number} apparentTemperature The feels like temperature
 * @prop {Number} dewPoint The dewpoint
 * @prop {Number} humidity The humidity
 * @prop {Number} pressure The pressure
 * @prop {Number} windSpeed The windspeed
 * @prop {Number} windGust The windgust speed
 * @prop {Number} windBearing Windbearing/direction
 * @prop {Number} cloudCover The cloudcover
 * @prop {Number} uvIndex The uvindex
 * @prop {Number} visibility The visibility
 * @prop {Number} ozone The ozone
 * @prop {any} sunriseTime The sunrise time (Returns null if unkown)
 * @prop {any} sunsetTime The sunset time (Returns null if unkown)
 * @prop {String} icon_url The icon url
 * @prop {Array<getSimpleWeatherAlerts>} alerts alerts
 * 
 * @typedef location the location specified
 * @prop {Number} lat The latitude of the location 
 * @prop {Number} lon The longitude of the location
 * 
 * @typedef {Object} getSimpleWeatherResponse The response for kumo.getSimpleWeather (may not be exact due to option differences)
 * @prop {Boolean} error If there was an error or not
 * @prop {Number} status The status of the request
 * @prop {getSimpleWeatherData} data The data from the response
 * @prop {String} units units specified
 * @prop {location} location The location shown
 * 
 *  @typedef getAdvancedWeatherAlerts
 * @prop {String} title The title of the alert
 * @prop {Array<Strings>} regions The regions the alert is for 
 * @prop {String} severity The severity of the alert
 * @prop {Number} time The epoch time of the alert
 * @prop {Number} expires The epoch expiration date
 * @prop {String} description The description of the alert
 * @prop {String} uri The uri of the alert
 * 
 * @typedef {Object} getAdvancedWeatherData data object for getSimpleWeather
 * @prop {String} time The time of the last update
 * @prop {String} summary The summary of the weather
 * @prop {String} icon The name of the icon
 * @prop {Number} precipIntensity The intensity of the precipitation
 * @prop {Number} precipProbability The probability of precipitation
 * @prop {Number} temperature The temperature
 * @prop {Number} apparentTemperature The feels like temperature
 * @prop {Number} dewPoint The dewpoint
 * @prop {Number} humidity The humidity
 * @prop {Number} pressure The pressure
 * @prop {Number} windSpeed The windspeed
 * @prop {Number} windGust The windgust speed
 * @prop {Number} windBearing Windbearing/direction
 * @prop {Number} cloudCover The cloudcover
 * @prop {Number} uvIndex The uvindex
 * @prop {Number} visibility The visibility
 * @prop {Number} ozone The ozone
 * @prop {any} sunriseTime The sunrise time (Returns null if unkown)
 * @prop {any} sunsetTime The sunset time (Returns null if unkown)
 * @prop {String} icon_url The icon url
 * @prop {Array<getAdvancedWeatherAlerts>} alerts alerts
 * 
 * @typedef {Object} getAdvancedWeatherResponse The response for kumo.getSimpleWeather (may not be exact due to option differences)
 * @prop {Boolean} error If there was an error or not
 * @prop {Number} status The status of the request
 * @prop {getAdvancedWeatherData} data The data from the response
 * @prop {String} units units specified
 * @prop {location} location The location shown
 * 
 * @typedef {Object} apis The apis you can use in geoip
 * @prop {String} weather the api url you can use to get the weather data about the location
 * @prop {String} gis The api url you can use to get more information about the location
 * @prop {String} openstreetmap The openstreet map url
 * @prop {String} googlemaps google maps url
 * 
 * @typedef {Object} geoipData The data for geoipResponse
 * @prop {String} city The city that the ip comes back to
 * @prop {String} continent_code The continent code the ip comes back to
 * @prop {String} continent_name The continent name the ip comes back to
 * @prop {String} country_code The country code the ip comes back to
 * @prop {String} country_name the country name the ip comes back to
 * @prop {any} dma_code The dma code the ip comes back to (returns null if unkown or not available)
 * @prop {Number} latitude The latitude of the country the ip comes back to
 * @prop {Number} longitude the longitude of the country the ip comes back to
 * @prop {String} postal_code The postal code the ip comes back to
 * @prop {String} region The region the ip comes back to
 * @prop {String} time_zone The timezone the ip comes back to
 * @prop {apis} apis api's you can use to get more information about the location 
 * 
 * @typedef {Object} geoipResponse The response for kumo.geoip
 * @prop {Boolean} error Whether or not there was an error
 * @prop {Number} response The response code
 * @prop {geoipData} data The data object for geoip data
 */
const axios = require('axios')
let kumo = class kumo {
    constructor(token){
        this.token = token
        this.http = axios.create({
            baseURL: 'https://api.ksoft.si',
            timeout: 2000,
            headers: {'Authorization': `NANI ${this.token}`}
        })
    }
    /**
     * @param {String} q The query for the location you want data for
     * @param {Boolean} fast Default: fast, return location data faster, but with less information 
     * @param {Boolean} more return more than one location
     * @param {Number} mapZoom Default: 12, set your own zoom level, if fast is not set or false, then this setting will be ignored because map zoom is calculated
     * @param {Boolean} includeMap Default: false, if to include an image of the area
     * @returns {Promise<searchResponse>} Information for the location
     */
    async search(q, {fast,more,mapZoom,includeMap}){
        if(!q) throw new Error("[Ksoft API] Please define a search query")
        const params = { q };
        if (fast) params.fast = fast;
        if (more) params.more = more
        if (mapZoom) params.map_zoom = mapZoom;
        if (includeMap) params.include_map = includeMap;
        const { data } = await this.http.get(`/kumo/gis?${require('querystring').stringify(params)}`)
        return data
        }
    /**
     * @param {String} reportType  weather report type. Can be one of: "currently", "minutely", "hourly", "daily"
     * @param {String} q Location search query
     * @param {String} units Unit types you can select on of: "si", "us", "uk2", "ca", "auto"
     * @param {String} lang The language of the response: 'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'he', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ka', 'ko', 'kw', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin', 'zh', 'zh-tw'
     * @param {String} icons Default: original, select icon pack
     * @returns {Promise<getSimpleWeatherResponse>} The information about the weather
     */
    async getSimpleWeather(reportType,q,units,lang,icons){
        let reportTypes = ["currently", "minutely", "hourly", "daily"]
        if(!reportType) throw new Error(`[Ksoft API] Please define a report type. Types: ${reportTypes.join(" , ")}`)
        if(!q) throw new Error("[Ksoft API] Please define a search query")
        const params = { q };
        if (units) params.units = units;
        if (lang) params.lang = lang;
        if (icons) params.icons = icons;
        const { data } = await this.http.get(`/kumo/weather/${reportType}?${require('querystring').stringify(params)}`)
        return data
        }
    /**
     * @param {Number} latitude The latitude of the location you are getting weather for
     * @param {Number} longitude The longitude of the location you are getting weather for
     * @param {String} reportType weather report type. Can be one of: "currently", "minutely", "hourly", "daily"
     * @param {String} units Unit types you can select on of: "si", "us", "uk2", "ca", "auto"
     * @param {String} lang The language of the response: 'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'he', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ka', 'ko', 'kw', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin', 'zh', 'zh-tw'
     * @param {String} icons Default: original, select icon pack
     * @returns {Promise<getAdvancedWeatherResponse>} The information about the weather
     */
    async _getAdvancedWeather(latitude,longitude,reportType,units,lang,icons){
        let reportTypes = ["currently", "minutely", "hourly", "daily"]
        if(!reportType) throw new Error(`[Ksoft API] Please define a report type. Types: ${reportTypes.join(" , ")}`)
        if(!latitude) throw new Error("[Ksoft API] please provide a latitude for the location")
        if(!longitude) throw new Error("[Ksoft API] please provide a longitude for the location")
        const urlParams = [latitude,longitude,reportType]
        const params = {};
        if (units) params.units = units;
        if (lang) params.lang = lang;
        if (icons) params.icons = icons;
        const { data } = await this.http.get(`/kumo/weather/${urlParams.splice(0,2).join(",")}/${urlParams.pop()}?${require('querystring').stringify(params)}').stringify(params)}`)
        return data
        }
    /**
     * @param {String} ip the ip address that you want to get information from
     * @returns {Promise<geoipResponse>} Information about the ip
     */
    async geoip(ip){
        if(!ip) throw new Error("[Ksoft API] Please define an ip address")
        const { data } = await this.http.get(`/kumo/geoip?ip=${ip}`)
        return data
        }
        
}

module.exports = {
    kumo
}
