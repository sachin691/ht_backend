const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BlogImage extends Model {
    static associate(models) {
      BlogImage.belongsTo(models.Blog, { foreignKey: "blogId" });
    }
  }

  BlogImage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BlogImage",
    }
  );

  return BlogImage;
};
