const { Model, DataTypes } = require('sequelize')

class Product extends Model {
  static init(sequelize) {
    super.init({
      barber_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'products'
    })
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'barber_id', as: 'Owner' })
  }
}

module.exports = Product