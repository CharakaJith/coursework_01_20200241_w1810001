'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      // single country has a single currency
      Country.belongsTo(models.Currency, {
        foreignKey: 'currencyId',
        as: 'currency',
        onDelete: 'CASCADE',
      });
    }
  }

  Country.init(
    {
      officialName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commonName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
      },
      currencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      languages: {
        type: DataTypes.JSON,
      },
      flagUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Country',
      tableName: 'Countries',
      underscored: true,
    }
  );

  return Country;
};
