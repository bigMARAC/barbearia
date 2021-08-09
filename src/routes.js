const express = require('express')
const routes = express.Router()

const Code = require('./controllers/Code')

routes.get('/', (req, res) => res.send('Barbearia MKO'))
routes.post('/code/generate', Code.generate)

module.exports = routes