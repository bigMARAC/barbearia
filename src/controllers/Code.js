const Code = require('../database/models/Code')
const randomstring = require('randomstring')

module.exports = {
  async generate(req, res) {
    const { customer_id } = req.params
    if (!customer_id) {
      return res.status(400).json({
        error: true,
        message: 'ID de cliente inválido'
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
  },
  async revoke(req, res) {

  }
}