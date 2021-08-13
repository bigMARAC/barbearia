'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn (
      'customer',
      'token',
      {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        comment: 'Token único de acesso'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn (
      'customer',
      'token'
    )
  }
};