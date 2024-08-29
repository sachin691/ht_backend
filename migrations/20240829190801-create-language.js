"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("languages", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      aboutThisCourse: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ourMethod: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      whatYoullLearn: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      requirements: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("languages");
  },
};
