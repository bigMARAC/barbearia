'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('codes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'id'
        },
        comment: 'ID referente ao cliente'
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Código único'
      },
      revoked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Informa se o token já foi utilizado'
      },
      offline: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Informa se o token é de uso offline'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
      })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('codes');
  }
};
