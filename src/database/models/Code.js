const { Model, DataTypes } = require('sequelize')

class Token extends Model {
  static init(sequelize) {
    super.init({
      customer_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      revoked: DataTypes.BOOLEAN,
      offline: DataTypes.BOOLEAN,
    }, {
      sequelize,
      tableName: 'codes'
    })
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'UCodes' })
  }
}

module.exports = Token