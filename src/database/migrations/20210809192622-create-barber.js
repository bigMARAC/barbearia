'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('barber', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nome do barbeiro'
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Chave unica que será utilizada para o acesso da aplicação'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Senha que será utilizada para o acesso da aplicação'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('barber');
  }
};
