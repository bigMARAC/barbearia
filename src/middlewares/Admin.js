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
      if (!decoded.admin) {
        return res.status(403).json({
          error: true,
          message: 'Usuário não autorizado'
        })
      }
      const user = await Barber.findOne({
        where: { id: decoded.id }
      })

      req.admin_id = user.id

      return next()
    })
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
    })
  }
}