const { Model, DataTypes } = require('sequelize')

class Token extends Model {
  static init(sequelize) {
    super.init({
      barber_id: DataTypes.INTEGER,
      token: DataTypes.STRING,
      expires_in: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'oauth_tokens'
    })
  }

  static associate(models) {
    this.belongsTo(models.Barber, { foreignKey: 'barber_id', as: 'UTokens' })
  }
}

module.exports = Token