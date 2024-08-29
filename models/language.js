"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Language.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      aboutThisCourse: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ourMethod: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      whatYoullLearn: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      requirements: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Language",
      tableName: "languages",
      timestamps: true, 
    }
  );

  return Language;
};
