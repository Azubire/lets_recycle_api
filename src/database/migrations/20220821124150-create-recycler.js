'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recyclers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
      },
      profile: {
        type: Sequelize.STRING
      },
      workingHours: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      profileImg: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      recyclingCatId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recyclers');
  }
};