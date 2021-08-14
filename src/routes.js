const express = require('express')
const routes = express.Router()

const Code = require('./controllers/Code')
const Customer = require('./controllers/Customer')
const Barber = require('./controllers/Barber')
const AdminMiddleware = require('./middlewares/Admin')

routes.get('/', (req, res) => res.send('Barbearia MKO'))
routes.post('/barber/auth', Barber.auth)
routes.get('/code/generate/:customer_id', AdminMiddleware, Code.generate)
routes.put('/code/revoke/:content', Code.revoke)
routes.get('/customer/codes/:customer_id', Code.getAll)
routes.post('/customer/store', Customer.store)
routes.get('/customer/getall', AdminMiddleware, Customer.getAll)
routes.post('/customer/auth', Customer.auth)

module.exports = routes