'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Infoproduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Infoproduct.belongsTo(models.Product, {
        foreignKey: 'productId',
          as: 'product'
    });
    }
  }
  Infoproduct.init({
    productId: DataTypes.INTEGER,
    information: DataTypes.TEXT,
    color: DataTypes.STRING,
    version: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Infoproduct',
  });
  return Infoproduct;
};