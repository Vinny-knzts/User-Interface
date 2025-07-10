'use strict';

const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  UserModel.init({
    pictureFileName: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    street: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    UF: DataTypes.STRING,
    biography: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  })

  return UserModel
}
