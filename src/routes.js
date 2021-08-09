const express = require('express')
const routes = express.Router()

const Code = require('./controllers/Code')
const Customer = require('./controllers/Customer')

routes.get('/', (req, res) => res.send('Barbearia MKO'))
routes.post('/code/generate', Code.generate)
routes.post('/customer/store', Customer.store)

module.exports = routes