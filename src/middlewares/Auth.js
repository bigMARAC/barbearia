const Customer = require('../database/models/Customer')
const Barber = require('../database/models/Barber')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.APP_SECRET

module.exports = function (req, res, next) {
  try {
    const [, token] = req.headers.authorization.split(' ')
    if (!token) {
      return res.status(400).json({
        error: true,
        message: 'Header authorization não encontrado'
      })
    }

    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        return res.status(401).json({
          error: true,
          message: 'Bearer Token inválido'
        })
      }

      let user = undefined

      if (decoded.admin) {
        user = await Barber.findOne({
          where: { id: decoded.id }
        })
      } else {
        user = await Customer.findOne({
          where: { id: decoded.id }
        })
      }

      if (!user) {
        return res.status(401).json({
          error: true,
          message: 'Bearer Token inválido'
        })
      }

      req.user_id = user.id
      req.admin_id = user.id

      return next()
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
    })
  }
}