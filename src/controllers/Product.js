const Product = require('../database/models/Product')
const Code = require('../database/models/Code')

module.exports = {
  async store(req, res) {
    try {
      const { name, description, price } = req.body
      if (!name) {
        return res.status(400).json({ error: true, message: 'Campos Inválidos.' })
      }

      let product = await Product.create({ barber_id: req.admin_id, name, description, price })

      const response = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
      }

      return res.status(200).json({ message: 'Produto cadastrado com sucesso.', product: response })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  },

  async getAll(req, res) {
    try {
      let products = await Product.findAll()

      return res.status(200).json({ products })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  },

  async redeem(req, res) {
    try {
      const { product_id } = req.params
      if (!product_id) {
        return res.status(400).json({
          error: true,
          message: 'Parâmetros inválidos.'
        })
      }

      let product = await Product.findOne({
        where: { id: product_id }
      })

      const codes = await Code.findAll({
        where: {
          customer_id: req.user_id,
          revoked: true
        },
        limit: product.price
      })
      
      if (codes.length < product.price) {
        return res.status(400).json({
          error: true,
          message: `Códigos insuficientes para resgatas o produto. \nCódigos: ${codes.length} - valor do produto: ${product.price}`
        })
      }

      for (const code of codes) {
        // delete code?
        // await code.save()
      }

      return res.status(200).json({ codes })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao tentar realizar a operação, \npor favor tente novamente mais tarde.'
      })
    }
  }
}