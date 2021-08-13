const { Model, DataTypes } = require('sequelize')

class Customer extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'customer'
    })
  }

  static associate(models) {
    this.hasMany(models.Code, { as: 'codes' })
  }
}

module.exports = Customer