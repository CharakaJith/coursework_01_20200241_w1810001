'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      capital: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      languages: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      flag_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_updated: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Countries');
  },
};
