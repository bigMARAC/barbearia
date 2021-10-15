'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      barber_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'barber',
          key: 'id'
        },
        comment: 'ID referente ao barbeiro'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nome do produto'
      },
      description: {
        type: Sequelize.STRING,
        comment: 'Descrição do produto'
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5,
        comment: 'Informa a quantidade de códigos necessários para resgatar o produto'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
      })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('products');
  }
};
