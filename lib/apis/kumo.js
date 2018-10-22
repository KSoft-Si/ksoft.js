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
    async search(q,fast,more,mapZoom,includeMap){
        if(!q) throw new Error("[Ksoft API] Please define a search query")
        const params = { q };
        if (fast) params.fast = fast;
        if (more) params.more = more
        if (mapZoom) params.map_zoom = mapZoom;
        if (includeMap) params.include_map = includeMap;
        const { data } = await this.http.get(`/kumo/gis?${require('querystring').stringify(params)}`)
        return data
        }
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
    async geoip(ip){
        if(!ip) throw new Error("[Ksoft API] Please define an ip address")
        const { data } = await this.http.get(`/kumo/geoip?ip=${ip}`)
        return data
        }
        
}

module.exports = {
    kumo
}
