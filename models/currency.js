'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate(models) {
      // single currency can be used by many countries
      Currency.hasMany(models.Country, {
        foreignKey: 'currencyId',
        as: 'countries',
        onDelete: 'CASCADE',
      });
    }
  }

  Currency.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Currency',
      underscored: true,
    }
  );

  return Currency;
};
