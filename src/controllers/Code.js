const Code = require('../database/models/Code')
const randomstring = require('randomstring')

module.exports = {
  async generate(req, res) {
    const code = randomstring.generate({
      length: 7,
      readable: true,
      charset: 'alphanumeric',
      capitalization: 'uppercase'
    })
    res.status(200).json({code})
  },
  async revoke(req, res) {

  }
}