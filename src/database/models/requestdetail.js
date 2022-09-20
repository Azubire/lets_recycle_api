'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RequestDetail.init({
    price: DataTypes.STRING,
    paymentStatus: DataTypes.BOOLEAN,
    RequestId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RequestDetail',
  });
  return RequestDetail;
};