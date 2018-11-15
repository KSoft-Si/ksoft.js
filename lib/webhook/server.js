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
        this.start()
    }
    async start(){
        app.listen(this.port, () => {
            publicIp.v4().then(host => {
                this.emit("ready", {
                    "host": `${host}:${this.port}`
                })
            })
            app.post("/", (req,res) => {
                if(req.get("Authorization") !== this.auth) throw new Error("You have recieved an unathorized post request on this ip and port!")
                const { event, event_data } = req.body
                switch(event){
                    case 'ban':
                        this.emit('ban', event_data)
                        break;
                    case 'vote':
                        this.emit('vote', event_data)
                        break;
                    case 'unban':
                        this.emit('unban', event_data)
                        break;
                }
                res.send(200)
            })
        })

    }
}


module.exports = Webhook