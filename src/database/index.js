const Sequelize = require('sequelize')
const config = require('../config/config')
const Barber = require('./models/Barber')
const Customer = require('./models/Customer')
const Code = require('./models/Code')

const connection = new Sequelize(config)
Barber.init(connection)
Customer.init(connection)
Code.init(connection)

Customer.associate(connection.models)
Code.associate(connection.models)

module.exports = config