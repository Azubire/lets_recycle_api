"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //adverts
      this.hasMany(models.Advert, {
        foreignKey: {
          allowNull: false,
        },
      });
      //recycler
      this.hasOne(models.Recycler);
      //notification
      this.hasMany(models.Notification);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      coverImg: DataTypes.STRING,
      profileImg: DataTypes.STRING,
      country: DataTypes.STRING,
      region: DataTypes.STRING,
      city: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
