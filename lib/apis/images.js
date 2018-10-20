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
    async getRandomWikiHow(nsfw){
        if(!nsfw) {
            try{
                const { data } = await this.http.get(`/images/random-wikihow`)
                return data
            }catch(err){
                console.error(err)
            }
        }else{
            try{
                const { data } = await this.http.get(`/images/random-wikihow?nsfw=${nsfw}`)
                return data
            }catch(err){
                console.error(err)
            }
        }
        
    }
    async getRandomCutePictue(){
            try{
                const { data } = await this.http.get(`/images/random-aww`)
                return data
            }catch(err){
                console.error(err)
            }
        }
    async getRandomNSFW(gif){
        if(!gif){
            try{
                const { data } = await this.http.get(`/images/random-nsfw`)
                return data
            }catch(err){
                console.error(err)
            }
        }else{
            try{
                const { data } = await this.http.get(`/images/random-nsfw?gifs=${gif}`)
                return data
            }catch(err){
                console.error(err)
            }
        }
        
    }
    async getRandomReddit(subReddit,removeNSFW,span){
            if(!subReddit) throw new Error("Please specify a subreddit")
            if(removeNSFW && span){
                try{
                    const { data } = await this.http.get(`/images/rand-reddit/${encodeURIComponent(subReddit)}?remove_nsfw=${removeNSFW}&span=${span}`)
                    return data
                }catch(err){
                    console.error(err)
                }
            }else if(removeNSFW){
                try{
                    const { data } = await this.http.get(`/images/rand-reddit/${encodeURIComponent(subReddit)}?remove_nsfw=${removeNSFW}`)
                    return data
                }catch(err){
                    console.error(err)
                }
            }else if(span){
                try{
                    const { data } = await this.http.get(`/images/rand-reddit/${encodeURIComponent(subReddit)}?span=${encodeURIComponent(span)}`)
                    return data
                }catch(err){
                    console.error(err)
                }
            }else{
                try{
                    const { data } = await this.http.get(`/images/rand-reddit/${encodeURIComponent(subReddit)}`)
                    return data
                }catch(err){
                    console.error(err)
                }
            }
            
            
        
    }
}

module.exports = {
    images
}