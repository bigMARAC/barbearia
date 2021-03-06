const Customer = require('../database/models/Customer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const secret = process.env.APP_SECRET

module.exports = {
  async store(req, res) {
    try {
      const { name, username, password } = req.body
      if (!name || !username || !password) {
        return res.status(400).json({ error: true, message: 'Campos Inválidos.' })
      }

      const saltRounds = 12
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) return res.status(500)
        try {
          const user = await Customer.create({ name, username, password: hash })
          const seconds = 43200
          const token = jwt.sign(
            {
              id: user.id,
              timestamp: Date.now(),
              admin: false
            },
            secret,
            { expiresIn: seconds }
          )

          user.token = token
          await user.save()

          const response = {
            id: user.id,
            name: user.name,
            username: user.username,
            token: user.token
          }
          return res.status(200).json({ message: 'Usuário cadastrado com sucesso.', response })
        } catch (err) {
          const type = err.errors[0]
          if (type.validatorKey == 'not_unique') {
            return res.status(400).json({
              error: true,
              message: `O nome de usuário "${type.value}" já está em uso.`
            })
          } else {
            return res.status(500)
          }
        }
      })
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  },
  async auth(req, res) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        return res.status(400).json({ error: true, message: 'Campos Inválidos.' })
      }

      const user = await Customer.findOne({
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
            admin: false
          },
          secret,
          { expiresIn: seconds }
        )

        user.token = token
        await user.save()

        const response = {
          id: user.id,
          name: user.name,
          username: user.username,
          token: user.token
        }

        return res.status(200).json({ message: 'Autenticado com sucesso.', user: response })
      })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  },
  async getAll(req, res) {
    try {
      const customers = await Customer.findAll(
        { attributes: ['id', 'name', 'username'] }
      )
      return res.status(200).json({ customers })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  }
}