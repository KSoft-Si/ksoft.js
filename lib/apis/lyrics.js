const axios = require('axios')
let lyrics = class lyrics {
    constructor(token){
        this.token = token
        this.http = axios.create({
            baseURL: 'https://api.ksoft.si',
            timeout: 2000,
            headers: {'Authorization': `NANI ${this.token}`}
        })
    }
    async search(q,textOnly,limit){
        if(!q) throw new Error("[Ksoft API] Please define a search query")
        const params = { q };
        if (textOnly) params.text_only = textOnly;
        if (limit) params.limit = limit
        const { data } = await this.http.get(`/lyrics/search?${require('querystring').stringify(params)}`)
        return data
    }
    async getArtistById(id){
        if(!id) throw new Error("[Ksoft API] Please define an id")
        const { data } = await this.http.get(`/lyrics/artist/${id}/`)
        return data
    }
    async getAlbumById(id){
        if(!id) throw new Error("[Ksoft API] Please define an id")
        const { data } = await this.http.get(`/lyrics/album/${id}/`)
        return data
    }
    async getTrackById(id){
        if(!id) throw new Error("[Ksoft API] Please define an id")
        const { data } = await this.http.get(`/lyrics/track/${id}/`)
        return data
    }
}
module.exports = {
    lyrics
}
