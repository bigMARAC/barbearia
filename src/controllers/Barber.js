const Barber = require('../database/models/Barber')
const Token = require('../database/models/Token')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const secret = process.env.APP_SECRET

module.exports = {
  async store(name, username, password) {
    try {
      if (!name || !username || !password) {
        return console.log('Parâmetros inválidos')
      }
  
      const saltRounds = 12
      password = bcrypt.hashSync(password.toString(), saltRounds)
  
      await Barber.create({
        name: name.toString(),
        username: username.toString(),
        password: password.toString()
      })
  
      return console.log('Usuário cadastrado com sucesso')
    } catch (error) {
      return console.log(error)
    }
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
      
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err || !result) {
          return res.status(401).json({
            error: true,
            message: 'Senha Inválida.'
          })
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

        const response = {
          id: user.id,
          name: user.name,
          username: user.username,
          token,
        }

        return res.status(200).json({ message: 'Autenticado com sucesso.', user: response })
      })
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  }
}