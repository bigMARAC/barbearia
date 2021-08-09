'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('oauth_tokens', {
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
        comment: 'ID referente ao usuário'
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Token único de acesso'
      },
      expires_in: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Tempo em segundos para a expiração do token'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
      })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('oauth_tokens');
  }
};
