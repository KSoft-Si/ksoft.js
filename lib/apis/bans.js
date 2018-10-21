const axios = require('axios')
const FormData = require("form-data")
let bans = class bans {
    constructor(token){
        this.token = token
        this.http = axios.create({
            baseURL: 'https://api.ksoft.si',
            timeout: 2000,
            headers: {'Authorization': `NANI ${this.token}`}
        })
    }
    async add(banData){
        if(!banData) throw new Error("[Ksoft API] Please specify json banData")
        const form = new FormData()
        for ( const key in banData ) {
          form.append(key, banData[key]);
        }
        try{
            const { data } = await this.http.post("/bans/add",form,{
                headers: form.getHeaders()
            })
            return data
        }catch(err){
            console.error(err)
        }
    }
    async getBanInfo(userID){
        if(!userID) throw new Error("[Ksoft API] Please specify user ID")
        if(typeof userID !== "string") throw new Error("[Ksoft API] userID must be a string")
        try{
            const { data } = await this.http.get(`/bans/info?user=${userID}`)
            return data
        }catch(err){
            console.error(err)
        }
    }
    async check(userID){
        if(!userID) throw new Error("[Ksoft API] Please specify user ID")
        if(typeof userID !== "string") throw new Error("[Ksoft API] userID must be a string")
        try{
            const { data } = await this.http.get(`/bans/check?user=${userID}`)
            return data
        }catch(err){
            console.error(err)
        }
    }
    async list(page,perPage){
        if(!page && !perPage){
            try{
                const { data } = await this.http.get(`/bans/list`)
                return data
            }catch(err){
                console.error(err)
            }
        }else if(!perPage){
            try{
                const { data } = await this.http.get(`/bans/list?page=${page}`)
                return data
            }catch(err){
                console.error(err)
            }
        }else if(!page){
            try{
                const { data } = await this.http.get(`/bans/list?per_page=${perPage}`)
                return data
            }catch(err){
                console.error(err)
            }
        }else{
            try{
                const { data } = await this.http.get(`/bans/list?page=${page}&per_page=${perPage}`)
                return data
            }catch(err){
                console.error(err)
            }
        }
        
    }
    async getUpdate(epochDate){
        if(!epochDate) throw new Error("[Ksoft API] Please specify an epochDate. Example: 1539915420")
        try{
            const { data } = await this.http.get(`/bans/updates?timestamp=${epochDate}`)
            return data
        }catch(err){
            console.error(err)
        }
    }

}

module.exports = {
    bans
}