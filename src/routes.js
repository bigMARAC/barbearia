const express = require('express')
const routes = express.Router()
const adminRoutes = express.Router()
const authRoutes = express.Router()

const Code = require('./controllers/Code')
const Product = require('./controllers/Product')
const Customer = require('./controllers/Customer')
const Barber = require('./controllers/Barber')
const AdminMiddleware = require('./middlewares/Admin')
const AuthMiddleware = require('./middlewares/Auth')

routes.get('/', (req, res) => res.send('Barbearia MKO'))
routes.post('/barber/auth', Barber.auth)
routes.post('/customer/store', Customer.store)
routes.post('/customer/auth', Customer.auth)

adminRoutes.use(AdminMiddleware)
adminRoutes.get('/code/generate/:customer_id', Code.generate)
adminRoutes.get('/customer/getall', Customer.getAll)
adminRoutes.post('/products/store', Product.store)

authRoutes.use(AuthMiddleware)
authRoutes.put('/code/revoke/:content', Code.revoke)
authRoutes.get('/customer/codes/:customer_id', Code.getAll)
authRoutes.put('/products/redeem/:product_id', Product.redeem)
authRoutes.get('/products', Product.getAll)

module.exports = { routes, adminRoutes, authRoutes }