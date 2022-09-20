"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecyclingCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //adverts
      this.hasMany(models.Advert, {
        foreignKey: { name: "categoryId", allowNull: false },
      });

      this.hasOne(models.Recycler);
    }
  }
  RecyclingCategory.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RecyclingCategory",
    }
  );
  return RecyclingCategory;
};
