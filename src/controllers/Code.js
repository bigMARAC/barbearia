const Code = require('../database/models/Code')
const randomstring = require('randomstring')

module.exports = {
  async generate(req, res) {
    try {
      const { customer_id } = req.params
      if (!customer_id) {
        return res.status(400).json({
          error: true,
          message: 'ID de cliente inválido.'
        })
      }
      const code = randomstring.generate({
        length: 7,
        readable: true,
        charset: 'alphanumeric',
        capitalization: 'uppercase'
      })
      await Code.create({
        customer_id,
        content: code
      })
      res.status(200).json({ code })
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  },
  async revoke(req, res) {
    try {
      const { content } = req.params
      if (!content) {
        return res.status(400).json({
          error: true,
          message: 'Código inválido.'
        })
      }

      const code = await Code.findOne({
        where: { content }
      })
      
      if (code.revoked) {
        return res.status(400).json({
          error: true,
          message: 'Esse código já foi utilizado.'
        })
      }

      code.revoked = true
      await code.save()
      
      return res.status(200)
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  }
}