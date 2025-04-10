'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {
    static associate(models) {
      // single api-key belongs to single user
      ApiKey.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      // single api-key can make many requests
      ApiKey.hasMany(models.ApiRequest, {
        foreignKey: 'keyId',
        as: 'apiRequests',
        onDelete: 'CASCADE',
      });
    }
  }

  ApiKey.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      apiKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ApiKey',
      tableName: 'ApiKeys',
      underscored: true,
    }
  );

  return ApiKey;
};
