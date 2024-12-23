'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.CustomerSupport, {
        foreignKey: 'userId',
         as: 'user'
    });
    User.hasOne(models.ShippingAddress, {
      foreignKey: 'userId',
       as: 'User'
  });
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address:DataTypes.STRING,
    gender: {
              type: DataTypes.ENUM('Nam', 'Nữ', 'other'),
              defaultValue: 'other',
            },
    dateOfBirth: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};