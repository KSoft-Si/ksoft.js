/*
    Special thanks to sdf for fixing this for me :-)!
*/
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const publicIp = require("public-ip")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const EventEmitter = require('events');
class Webhook extends EventEmitter {
    /**
     * @constructor webhook constructor
     * @param {number} port The port you want to the server to run on
     * @param {String} token your ksoft api webhook authentication
     */
    constructor(port, Authentication) {
        super()
        this.port = port
        this.auth = Authentication
        if(!port) throw new Error("please specify a port")
        this.start()
    }
    async start(){
        app.post("/", (req,res) => {
            if(req.get("Authorization") !== this.auth){
                res.sendStatus(403)
                throw new Error("You have recieved an unathorized post request on this ip and port!")
                
            }
            const { event, event_data } = req.body
            this.emit(event, event_data)
            res.sendStatus(200)
        })
        app.listen(this.port, () => {
            publicIp.v4().then(host => {
                this.emit("ready", {
                    "host": `${host}:${this.port}`
                })
            })
        })

    }
}


module.exports = Webhook