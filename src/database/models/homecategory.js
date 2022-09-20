"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HomeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HomeCategory.init(
    {
      icon: DataTypes.STRING,
      title: DataTypes.STRING,
      screen: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HomeCategory",
      tableName: "homecategories",
    }
  );
  return HomeCategory;
};
