'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Country.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      languages: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flagUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Country',
      underscored: true,
    }
  );
  return Country;
};
