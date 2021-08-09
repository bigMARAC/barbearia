const Sequelize = require('sequelize')
const config = require('../config/config')
const Barber = require('../database/models/Barber')
const Customer = require('../database/models/Customer')
const Code = require('../database/models/Code')

const connection = new Sequelize(config)
Barber.init(connection)
Customer.init(connection)
Code.init(connection)

Customer.associate(connection)
Code.associate(connection)

module.exports = config