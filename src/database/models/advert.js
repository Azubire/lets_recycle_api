"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);

      //category
      this.belongsTo(models.RecyclingCategory, {
        foreignKey: { name: "categoryId", allowNull: false },
      });
    }
  }
  Advert.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      adImage: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      price: DataTypes.STRING,
      weight: DataTypes.STRING,
      status: DataTypes.ENUM("pending", "complete", "rejected"),
    },
    {
      sequelize,
      modelName: "Advert",
    }
  );
  return Advert;
};
