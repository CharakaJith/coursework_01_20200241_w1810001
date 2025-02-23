'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApiRequest extends Model {
    static associate(models) {
      // single request belongs to single api-key
      ApiRequest.belongsTo(models.ApiKey, {
        foreignKey: 'keyId',
        as: 'apiKey',
      });
    }
  }
  ApiRequest.init(
    {
      keyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endpoint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statusCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ApiRequest',
      underscored: true,
    }
  );

  return ApiRequest;
};
