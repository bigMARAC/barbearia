const express = require('express')
const routes = express.Router()

const Code = require('./controllers/Code')
const Customer = require('./controllers/Customer')
const Barber = require('./controllers/Barber')
const AdminMiddleware = require('./middlewares/Admin')

routes.get('/', (req, res) => res.send('Barbearia MKO'))
routes.post('/barber/auth', Barber.auth)
routes.post('/code/generate/:customer_id', AdminMiddleware, Code.generate)
routes.post('/customer/store', Customer.store)
routes.post('/customer/auth', Customer.auth)

module.exports = routes