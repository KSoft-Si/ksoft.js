const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const publicIp = require("public-ip")
app.use(bodyParser.json)
app.use(bodyParser.urlencoded({extended: false}))
const EventEmitter = require('events');
class Webhook extends EventEmitter {
    /**
     * @constructor webhook constructor
     * @param {number} port The port you want to the server to run on
     * @param {String} token your ksoft api token
     */
    constructor(port, Authentication) {
        super()
        this.port = port
        this.auth = Authentication
        if(!port) throw new Error("please specify a port")
        this._createServer(this.port)
    }

   async _createServer(port){
        app.listen(port, async () =>{
            const publicip = await publicIp.v4()
            this.emit("ready", {host: publicip + ":" + port})
        })
        
    }
    start(){
        app.post("/", (req,res) => {
            if(req.get("Authorization") !== this.auth) return res.sendStatus(401)
            if(req.body.event == "ban") {
                this.emit("ban", req.body.event_data)
            }
            if(req.body.event == "vote") {
                this.emit("vote", req.body.event_data)
            }
            if(req.body.event == "unban") {
                this.emit("unban", req.body.event_data)
            }
            res.send({"success": true})
        })
    }
}


module.exports = Webhook