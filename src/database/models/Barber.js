const { Model, DataTypes } = require('sequelize')

class Barber extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'barber'
    })
  }

  static associate(models) {
    this.hasMany(models.Token, { as: 'tokens' })
  }
}

module.exports = Barber