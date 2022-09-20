"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      // this.belongsTo
      this.belongsTo(models.Recycler, {
        foreignKey: "RecyclerId",
        targetKey: "userId",
      });
    }
  }
  Notification.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      avatar: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      RecyclerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
