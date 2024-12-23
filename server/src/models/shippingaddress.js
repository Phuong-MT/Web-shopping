'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShippingAddress.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
    });
    }
  }
  ShippingAddress.init({
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city: DataTypes.STRING,
    status: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    sessionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShippingAddress',
  });
  return ShippingAddress;
};