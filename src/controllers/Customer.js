const Customer = require('../database/models/Customer')

module.exports = {
  async store(req, res) {
    try {
      const { name, username, password } = req.body
      if (!name || !username || !password) {
        return res.status(400).json({ error: true, message: 'Campos Inválidos.' })
      }

      const user = await Customer.create({ name, username, password })
      return res.status(200).json({ message: 'Usuário cadastrado com sucesso.', user })
    } catch (err) {
      const type = err.errors[0]
      if (type.validatorKey == 'not_unique') {
        return res.status(400).json({
          error: true,
          message: `O nome de usuário "${type.value}" já está em uso.`
        })
      }
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  },
  async auth(req, res) {

  }
}