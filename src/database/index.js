const Sequelize = require('sequelize')
const config = require('../config/config')
const Barber = require('./models/Barber')
const Customer = require('./models/Customer')
const Code = require('./models/Code')
const Product = require('./models/Product')
const Token = require('./models/Token')

const connection = new Sequelize(config)
Barber.init(connection)
Customer.init(connection)
Code.init(connection)
Product.init(connection)
Token.init(connection)

Customer.associate(connection.models)
Code.associate(connection.models)
Token.associate(connection.models)

module.exports = config