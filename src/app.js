const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

class App {
    constructor () {
        this.server = express()
        mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse.plyod3x.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        this.middlewares()
        this.routes()
    }
    middlewares () {
        this.server.use(cors())
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )
        this.server.use(express.json())
    }
    routes () {
        this.server.use(routes)
    }
}

module.exports = new App().server