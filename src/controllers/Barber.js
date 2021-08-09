const Barber = require('../database/models/Barber')
const Token = require('../database/models/Token')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.APP_SECRET

module.exports = {
  async store(req, res) {

  },
  async auth(req, res) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        return res.status(400).json({ error: true, message: 'Campos Inválidos.' })
      }

      const user = await Barber.findOne({
        where: { username }
      })

      if (!user) {
        return res.status(404).json({ error: true, message: 'Nome de usuário inválido.' })
      }
      
      if (user.password != password) {
        return res.status(401).json({ error: true, message: 'Senha inválida.' })
      }

      const seconds = 43200
      const token = jwt.sign(
        {
          id: user.id,
          timestamp: Date.now(),
          admin: true
        },
        secret,
        { expiresIn: seconds }
      )

      await Token.create({
        barber_id: user.id,
        token,
        expires_in: seconds
      })

      return res.status(200).json({ message: 'Autenticado com sucesso.', user, token })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  }
}