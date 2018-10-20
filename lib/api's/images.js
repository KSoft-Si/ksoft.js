const axios = require('axios')
let images = class images {
    constructor(token){
        this.token = token
        this.http = axios.create({
            baseURL: 'https://api.ksoft.si',
            timeout: 2000,
            headers: {'Authorization': `NANI ${this.token}`}
        })
    }
    async getRandomMeme(){
        try{
            const { data } = await this.http.get('/images/random-meme')
            return data
        }catch(err){
            console.error(err)
        }
    }
    async getRandomImage(tag){
        try{
            if(!tag) throw new Error("[Ksoft API] No tag found")
            const { data } = await this.http.get(`/images/random-image?tag=${tag}`)
            return data
        }catch(err){
            console.error(err)
        }
    }
    async getTags(){
        try{
            const { data } = await this.http.get(`/images/tags`)
            return data
        }catch(err){
            console.error(err)
        }
    }
    async searchTags(query){
        if(!query) throw new Error("[Ksoft API] Please define a search query")
        try{
            const { data } = await this.http.get(`/images/tags/${encodeURIComponent(query)}`)
            return data
        }catch(err){
            console.error(err)
        }
    }
    async getImageFromId(snowflake){
        if(!snowflake) throw new Error("[Ksoft API] Please define a unique image id")
        try{
            const { data } = await this.http.get(`/images/image/${encodeURIComponent(snowflake)}`)
            return data
        }catch(err){
            console.error(err)
        }
    }
}

module.exports = {
    images
}