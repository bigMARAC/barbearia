'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nome do usuário'
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Chave unica que será utilizada para o acesso'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Senha que será utilizada para o acesso'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customer');
  }
};
