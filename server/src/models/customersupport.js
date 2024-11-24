'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerSupport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerSupport.belongsTo(models.User, {
        foreignKey: 'userId',
          as: 'user'
    });
    }
  }
  CustomerSupport.init({
    userId: DataTypes.INTEGER,
    Subject: DataTypes.STRING, 
    Message: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'CustomerSupport',
  });
  return CustomerSupport;
};