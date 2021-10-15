const Product = require('../database/models/Product')

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
  }
}