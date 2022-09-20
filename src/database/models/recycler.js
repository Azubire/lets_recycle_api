"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recycler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.RecyclingCategory, {
        foreignKey: "RecyclingCatId",
      });
      //user
      this.belongsTo(models.User);
      this.hasMany(models.Notification);
    }
  }
  Recycler.init(
    {
      companyName: DataTypes.STRING,
      about: DataTypes.STRING,
      profile: DataTypes.STRING,
      workingHours: DataTypes.STRING,
      location: DataTypes.STRING,
      profileImg: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      recyclingCatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Recycler",
      tableName: "recyclers",
    }
  );
  return Recycler;
};
