'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
    });

    // Thiết lập quan hệ với ProductImage
    Product.hasMany(models.ProductImage, {
        foreignKey: 'productId',
        as: 'images'
    });
    //Thiết lập quan hệ với infoproduct
    Product.hasMany(models.Infoproduct, {
      foreignKey: 'productId',
      as: 'info'
    });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
